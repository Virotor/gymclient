import {
  Button, UploadFile,
  UploadProps
} from 'antd';
import Upload, { RcFile } from 'antd/es/upload';
import axios from 'axios';
import { useState } from 'react';
import { ImageProps } from './UserInfo';

export const UploaderImage: React.FC<ImageProps> = ({ username, updateImage }: ImageProps) => {

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };


  const uploadImage = async () => {
    let data = new FormData();
    let a: RcFile = fileList[0].originFileObj as RcFile;
    setUploading(true);
    data.append('image', a);
    data.append('username', username);
    return await axios(
      {
        method: 'post',
        url: 'http://localhost:8080/image/post/client',
        data: data,
        headers: {
          'Content-Type': 'multipart/form-data; ',
        }
      }
    ).catch(e => {
      setUploading(false);
    }
    ).then(() => {
      setTimeout(() => {
        updateImage();
        setUploading(false);
      });

    }
    );

  };




  return (
    <>

      <Upload

        beforeUpload={(file) => {
          setFileList([...fileList, file]);
          return false;
        }}
        accept={'.png'}
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        maxCount={1}
      >
        {fileList.length < 1 && '+ Upload'}
      </Upload>
      <Button
        type="primary"
        onClick={uploadImage}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </>
  );
};
