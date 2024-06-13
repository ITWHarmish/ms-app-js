import { useState, useEffect } from "react";
import { Button, Col, Form, Input, Row, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { useAppDispatch } from "../../redux/hooks";
import { addBlog, allBlogs, updateBlog } from "../../redux/actions/blogAction";
import Editor from "../../components/Editor/Editor";

const BlogForm = ({ handleModelClose, editData }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const [refreshToken, setRefreshToken] = useState<any>();

  useEffect(() => {
    if (editData) {
      form.setFieldsValue({
        title: editData.title,
        richText: editData.richText,
        image: editData.image,
      });
    }
    setRefreshToken(new Date());
  }, [editData, form]);

  const handleFinish = (values: any) => {
    const event = {
      title: values.title,
      richText: values.richText,
      image: values.image,
    };
    const editPayload = {
      id: editData._id,
      title: values.title,
      richText: values.richText,
      image: values.image,
    };
    dispatch(editData ? updateBlog(editPayload) : addBlog(event));
    handleModelClose();
    setTimeout(() => {
      dispatch(allBlogs());
    }, 500);
  };

  const onReset = () => {
    form.resetFields();
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL: any = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const customUpload = (file) => {
    getBase64(file)
      .then((base64) => {
        form.setFieldValue("image", base64);
        setRefreshToken(new Date());
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const uploadButton = (str) => (
    <div>
      {!str && <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        onFinish={handleFinish}
        autoComplete="off"
        form={form}
        className="formStyle"
        initialValues={{ title: "", richText: "", image: "" }}
        key={refreshToken}
      >
        <Form.Item label="Title" name="title" rules={[{ required: true, message: "Title is Required" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Rich Text" name="richText" rules={[{ required: true, message: "Rich Text is Required" }]}>
          <Editor
            data={form.getFieldValue("richText")}
            handleChange={(value) => {
              form.setFieldValue("richText", value);
            }}
          />
        </Form.Item>
        <Form.Item name="image" label="Event Time" rules={[{ required: true, message: "Please select Time" }]}>
          <Upload
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            customRequest={({ onError, onSuccess, file }) => customUpload(file)}
          >
            {form.getFieldValue("image") ? (
              <img src={form.getFieldValue("image")} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton(form.getFieldValue("image"))
            )}
          </Upload>
        </Form.Item>
        <Row>
          <Col offset={16} span={4}>
            <Button type="primary" ghost onClick={onReset}>
              Reset
            </Button>
          </Col>
          <Col span={4}>
            <Button type="primary" htmlType="submit">
              {editData ? "Update" : "Submit"}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default BlogForm;
