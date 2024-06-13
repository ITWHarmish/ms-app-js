import "./profile.scss";

import { Button, Card, Col, message, Row, Space, Tabs, Typography, Upload } from "antd";
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from "antd/lib/upload";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import PageHeader from "../../components/pageHeader/PageHeader";
import { useAuthValue } from "../../context/AuthContext";
import { storage } from "../../firebase";
import { getUserById, updateUser } from "../../services/auth.crud";
import { IUser } from "../../types/iUser";
import CompanyDetails from "./CompanyDetails";
import PersonalDetails from "./PersonalDetails";
import PersonalPortfolio from "./PersonalPortfolio";
import ProfessionalDetails from "./ProfessionalDetails";

const { TabPane } = Tabs;

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const EditProfile = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuthValue();

  const [formData, setFormData] = useState<IUser>();
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleSubmit = () => {
    setLoading(true);
    updateUser(currentUser.uid, formData).then(() => {
      navigate("/profile");
      getUserById(currentUser.uid);
      setLoading(false);
      message.success("Profile updated successfully");
    });
  };

  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    if (currentUser) setLoading(false);
    if (currentUser && currentUser.profileImage) setImageUrl(currentUser.profileImage);
  }, [currentUser]);

  const handleChange: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setLoading(false);
      return;
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const customUpload = ({ onError, onSuccess, file }: any) => {
    const storageRef = ref(storage, currentUser.uid);
    const profileRef = ref(storageRef, uuid() + "-profile.jpg");
    uploadBytes(profileRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url: string) => {
        setImageUrl(url);
        updateUser(currentUser.uid, { profileImage: url }).then(() => {
          getUserById(currentUser.uid);
          setLoading(false);
          message.success("Profile image updated successfully");
        });
      });
    });
  };

  return (
    <>
      <PageHeader
        title="Edit Profile"
        right={
          <Space style={{ justifyContent: "flex-end" }}>
            <Button type="primary" onClick={handleSubmit} loading={loading}>
              Submit
            </Button>
            <Button onClick={() => navigate("/profile")}>Cancel</Button>
          </Space>
        }
      />
      <Row gutter={16}>
        <Col md={6}>
          <Space direction="vertical" size={16}>
            <Card title={currentUser && currentUser.firstName + " " + currentUser.lastName}>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
                customRequest={customUpload}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: "100%" }} /> : uploadButton}
              </Upload>
            </Card>
            <PersonalPortfolio
              values={currentUser}
              callbackValues={(values: object) => setFormData({ ...formData, ...values })}
            />
          </Space>
        </Col>
        <Col md={18}>
          <Space direction="vertical" size={16}>
            <Card title={<Typography.Text>Role</Typography.Text>}>
              <CompanyDetails
                values={currentUser}
                callbackValues={(values: object) => setFormData({ ...formData, ...values })}
              />
            </Card>
            <Card>
              <Tabs defaultActiveKey="1" style={{ marginTop: -12 }}>
                <TabPane tab="Personal Details" key="1">
                  <PersonalDetails
                    values={currentUser}
                    callbackValues={(values: object) => setFormData({ ...formData, ...values })}
                  />
                </TabPane>
                <TabPane tab="Experience" key="2">
                  <ProfessionalDetails
                    values={currentUser}
                    callbackValues={(values: object) => setFormData({ ...formData, ...values })}
                  />
                </TabPane>
              </Tabs>
            </Card>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default EditProfile;
