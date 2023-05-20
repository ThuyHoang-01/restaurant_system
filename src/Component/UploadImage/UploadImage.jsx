import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Space, Upload } from 'antd';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadImage = ({title, setImage}) => {
  const [fileList, setFileList ]= useState()
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    setImage(newFileList[0])
  };
  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
    <Upload
      beforeUpload={()=> false}
      listType="picture"
      maxCount={1}
      onPreview={handlePreview}
      onChange={handleChange}
    >
      <Button icon={<UploadOutlined />}>{title}</Button>
    </Upload>
  </Space>
  )
};

export default UploadImage;