import { useEffect, useState } from "react";
import { Button, Modal, Tabs, TabsProps } from "antd";
import BlogForm from "./BlogForm";
import Blog from "./Blogs";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { allBlogs } from "../../redux/actions/blogAction";
import { PlusOutlined } from "@ant-design/icons";

const Events = () => {
  const dispatch = useAppDispatch();

  const [newEvent, setNewEvent] = useState<boolean>(false);
  const [editData, setEditData] = useState<boolean>(false);

  const blogs = useAppSelector((state) => state.blogs.blog);

  useEffect(() => {
    dispatch(allBlogs());
  }, []);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Blog",
      children: <Blog blogs={blogs} setEditData={setEditData} />,
    },
    {
      key: "2",
      label: "Events",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Discussion",
      children: "Content of Tab Pane 3",
    },
    {
      key: "4",
      label: "Polls",
      children: "Content of Tab Pane 4",
    },
  ];

  const handleModelClose = () => {
    setNewEvent(false);
    setEditData(undefined);
  };

  return (
    <>
      <div style={{ textAlign: "end" }}>
        <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => setNewEvent(true)} />
      </div>
      <Tabs type="card" size="small" defaultActiveKey="1" items={items} />
      <Modal
        width={500}
        title={"Create New Event"}
        footer={null}
        open={newEvent || editData}
        onCancel={handleModelClose}
      >
        <BlogForm handleModelClose={handleModelClose} editData={editData} />
      </Modal>
    </>
  );
};

export default Events;
