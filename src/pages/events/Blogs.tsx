import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Card, Col, Modal, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { allBlogs, deleteBlog } from "../../redux/actions/blogAction";
import { useAppDispatch } from "../../redux/hooks";

const Blog = ({ blogs, setEditData }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Row>
        {blogs.map((item, index) => {
          return (
            <Col span={4} key={index}>
              <Card
                style={{ width: 240, marginTop: 10 }}
                actions={[
                  <EditOutlined key="edit" onClick={() => setEditData(item)} />,
                  <DeleteOutlined
                    key="delete"
                    onClick={() =>
                      Modal.confirm({
                        title: "Are you sure you want to delete this field?",
                        icon: <ExclamationCircleOutlined style={{ color: "red", paddingTop: 1 }} />,
                        cancelText: "No",
                        okText: "Yes",
                        onOk() {
                          dispatch(deleteBlog(item._id));
                          setTimeout(() => dispatch(allBlogs()), 500);
                        },
                      })
                    }
                  />,
                ]}
              >
                <img alt="example" src={item.image} style={{ width: 200, height: 210 }} />
                <Meta avatar={""} title={item.title} description={item.richText.replace(/<[^>]+>/g, "")} />
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};
export default Blog;
