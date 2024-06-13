import { Typography } from "antd";
import { useParams } from "react-router-dom";

import { useAppSelector } from "../../redux/hooks";

export const Members = () => {
  const { projectId } = useParams();
  const { Title, Paragraph } = Typography;
  const projectState = useAppSelector((state: any) => state.project);
  let project: any = null;
  if (projectId) {
    project = projectState.project.find((project: any) => project._id === projectId);
  }
  return (
    <>
      <Title level={5}> Team Leader </Title>
      <Paragraph>{project.leader}</Paragraph>
      <Title level={5}>Developers</Title>
      {project.developers.map((dev, index) => (
        <>
          <Paragraph key={index}>{dev}</Paragraph>
        </>
      ))}
    </>
  );
};
