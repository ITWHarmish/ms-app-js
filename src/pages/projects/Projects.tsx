import "./projects.scss";

import { Button, Input, Select, SelectProps, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import PageHeader from "../../components/pageHeader/PageHeader";
import AdminTableActions from "../../components/table/AdminTableActions";
import { deleteProject, readProject } from "../../redux/actions/projectAction";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IProject } from "../../types/iProject";
import { PROJECT_STATUS } from "../../util/constants";
import DeveloperColumnFormatter from "./columnFormatter/Developer";
import StatusColumnFormatter from "./columnFormatter/Status";
import TeamLead from "./columnFormatter/TeamLead";

const Projects = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.userState.user);

  const { isLoading, project } = useAppSelector((state: any) => state.project);
  const [value, setValue] = useState("");
  const [dataSource, setDataSource] = useState<IProject[]>();
  const [prolist, setProlist] = useState([]);
  const { Search } = Input;
  const options: SelectProps["options"] = [];

  const handelproStatusChange = (values: string[]) => {
    values ? setProlist(values) : setProlist(project);
  };

  PROJECT_STATUS.map((item: any) =>
    options.push({
      key: item.value,
      value: item.value,
      label: (
        <>
          <Typography className="option">{item.label}</Typography>
        </>
      ),
    }),
  );

  useEffect(() => {
    dispatch(readProject());
  }, [dispatch]);

  useEffect(() => {
    setDataSource(project);
  }, [project]);

  useEffect(() => {
    if (prolist?.length === 0) {
      setDataSource(project);
    } else {
      setDataSource(project.filter((item: any) => prolist.some((name) => [item.status].flat().includes(name))));
    }
  }, [project, prolist]);

  const optionss: SelectProps["options"] = [];
  {
    project.length > 0 &&
      project.map((item: any) =>
        optionss.push({
          key: item.name,
          value: item.name,
          label: (
            <>
              <Typography>
                {" "}
                {item.pid} {item.name}
              </Typography>
            </>
          ),
        }),
      );
  }

  const columns: any = [
    {
      title: "Prefix",
      dataIndex: "pid",
      key: "pid",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: any, record: any) => <Link to={`/project/${record._id}`}>{record.name}</Link>,
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => StatusColumnFormatter(text, record, dispatch),
      width: 100,
    },
    {
      title: "Team Lead",
      dataIndex: "leader",
      key: "leader",
      render: (text, record) => TeamLead(text, record, users, dispatch),
    },
    {
      title: "Developers",
      dataIndex: "developers",
      key: "developers",
      render: (text, record) => DeveloperColumnFormatter(text, record, users, dispatch),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text: any, record: any) => (
        <AdminTableActions
          handleEdit={() => {
            navigate(`/project-edit/${record._id}`, { replace: true });
          }}
          handleDelete={() => {
            dispatch(deleteProject(record));
          }}
        />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Projects"
        right={
          <>
            <Space direction="horizontal">
              <Search
                allowClear
                placeholder="search"
                value={value}
                onChange={(e) => {
                  const searchValue = e.target.value;
                  setValue(searchValue);
                  const filteredData = project.filter(
                    (entry: any) => entry.name.toLowerCase().includes(searchValue) || entry.name.includes(searchValue),
                  );
                  setDataSource(filteredData);
                }}
              />

              <Select
                mode="multiple"
                allowClear
                style={{ minWidth: 150 }}
                className="status"
                placeholder="Project Status"
                options={options}
                onChange={handelproStatusChange}
              />
              <Button type="primary" onClick={() => navigate("/project-create", { replace: true })}>
                + Add New
              </Button>
            </Space>
          </>
        }
      />
      <Table
        columns={columns}
        dataSource={dataSource}
        size="small"
        rowKey={(record: any) => record._id as string}
        loading={isLoading}
        pagination={{
          defaultPageSize: 10,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
      />
    </>
  );
};
export default Projects;
