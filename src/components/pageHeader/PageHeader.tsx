import { Divider, Space, Typography } from "antd";

const PageHeader = ({ title, left, right }: any) => {
  return (
    <>
      <Space style={{ marginBottom: 16, justifyContent: "space-between" }}>
        <Space>
          <Typography.Title level={3} style={{ margin: 0 }}>
            {title}
          </Typography.Title>
          {left}
        </Space>
        {right}
      </Space>
      <Divider />
    </>
  );
};

export default PageHeader;
