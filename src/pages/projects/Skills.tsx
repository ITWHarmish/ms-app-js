import { Tag } from "antd";
import { useParams } from "react-router-dom";

import { useAppSelector } from "../../redux/hooks";

export const Skills = () => {
  const { projectId } = useParams();
  const projectState = useAppSelector((state: any) => state.project);
  let project: any = null;
  if (projectId) {
    project = projectState.project.find((project: any) => project._id === projectId);
  }
  return (
    <>
      {project.skills.map((skll, index) => (
        <Tag key={index} style={{ margin: 8 }} color="blue">
          {skll}
        </Tag>
      ))}
    </>
  );
};
