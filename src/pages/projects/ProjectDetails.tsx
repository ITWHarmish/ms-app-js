import { Card, Col, Descriptions, Row, Space } from "antd";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

import { useAppSelector } from "../../redux/hooks";
import { Members } from "./Members";
import { Skills } from "./Skills";
import { Summery } from "./Summery";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const projectState = useAppSelector((state: any) => state.project);
  let project: any = null;
  if (projectId) {
    project = projectState.project.find((project: any) => project._id === projectId);
  }
  let tag = { name: "", color: "" };
  switch (project.status) {
    case "1":
      tag = {
        name: "In Progress",
        color: "processing",
      };
      break;
    case "2":
      tag = {
        name: "Completed",
        color: "success",
      };
      break;
    case "3":
      tag = {
        name: "On Hold",
        color: "warning",
      };
      break;
    default:
      // eslint-disable-next-line
      tag = {
        name: "Not Started",
        color: "default",
      };
      break;
  }

  return (
    <>
      <div className="site-page-header-ghost-wrapper">
        {/* <PageHeader
          className="site-page-header"
          ghost={false}
          title={project.name}
          tags={
            <>
              <Tag color={tag.color}>{tag.name}</Tag>
              <Tag color="#f50">{project.priority}</Tag>
            </>
          }
        > */}
        <Descriptions size="small">
          <Descriptions.Item>{project.company}</Descriptions.Item>
          <Descriptions.Item label="Create Date">{dayjs(project.createdAt).format("DD-MM-YYYY")}</Descriptions.Item>
          <Descriptions.Item label="Due Date">
            {project.deadline ? dayjs(project.deadline).format("DD-MM-YYYY") : "-"}
          </Descriptions.Item>
        </Descriptions>
        {/* </PageHeader> */}
      </div>
      <Row gutter={16}>
        <Col md={16}>
          <Space direction="vertical" size={16}>
            <Card hoverable style={{ marginTop: 20 }}>
              <Summery projectData={project} />
            </Card>
          </Space>
        </Col>
        <Col md={8}>
          <Space direction="vertical" size={8}>
            <Card title="Skills" hoverable style={{ marginTop: 20 }}>
              <Skills />
            </Card>
            <Card title="Members" hoverable style={{ marginTop: 5 }}>
              <Members />
            </Card>
          </Space>
        </Col>
      </Row>
    </>
  );
};
export default ProjectDetails;
