import { Button } from "antd";
import axios from "axios";

import { API_URL } from "../../../util/secrets";

const UploadToDriveService = ({ uid }) => {
  const handleUploadToDrive = async () => {
    const { data } = await axios.get(`${API_URL}/timelog/upload?uid=${uid}`);
    console.log(data);
  };

  return (
    <>
      <Button onClick={handleUploadToDrive}>Upload to Drive</Button>
    </>
  );
};

export default UploadToDriveService;
