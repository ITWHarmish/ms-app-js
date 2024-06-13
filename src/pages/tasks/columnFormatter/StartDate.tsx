import { Typography } from "antd";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { DATE_FORMAT_SHORT } from "../../../util/constants";

dayjs.extend(localizedFormat);

const StartDate = (text) => {
  return (
    <>
      <Typography.Text>{dayjs(text).format(DATE_FORMAT_SHORT)}</Typography.Text>
    </>
  );
};

export default StartDate;
