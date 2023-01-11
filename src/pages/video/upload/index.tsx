import { PageContainer, ProForm, ProFormText } from '@ant-design/pro-components';
import { Card, message } from 'antd';
import React, { useState } from 'react';
import UploadPicComponent from '@/components/Upload/UploadPicComponent';
import UploadVideoComponent from '@/components/Upload/UploadVideoComponent';
import { addVideo } from '@/services/ant-design-pro/api';
import { history } from '@@/core/history';
import { localStore } from '@/utils/utils';

const Index: React.FC = () => {
  const [picPath, setPicPath] = useState('');
  const [s3Url, setS3Url] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');

  const handleSubmit = async (value: any) => {
    if (!value.name) {
      message.error(`请输入视频名称`);
      return;
    }
    if (picPath === '') {
      message.error(`请上传视频封面`);
      return;
    }
    if (s3Url === '') {
      message.error(`请上传视频`);
      return;
    }
    const { userid } = JSON.parse(localStore.getItem('userInfo') || '{}');
    const param = {
      title: value.name,
      thumbnail: picPath,
      s3_url: s3Url,
      source_url: sourceUrl,
      create_user_id: userid,
    };
    const res = await addVideo({ ...param });
    if (res.code === 0) {
      message.success(`上传成功`);
      //前往视频列表查看
      history.push('/admin/video/list');
    } else {
      message.error(`${res.msg}`);
    }
  };

  return (
    <PageContainer>
      <Card>
        <ProForm
          onFinish={async (values) => {
            await handleSubmit(values);
          }}
        >
          <ProFormText
            fieldProps={{
              maxLength: 50,
            }}
            name="name"
            width="md"
            label="视频名称"
            placeholder="请输入名称"
          />
          <UploadPicComponent
            onResult={(path) => {
              setPicPath(path);
            }}
          />
          <UploadVideoComponent
            onResult={(s3_url, source_url) => {
              setS3Url(s3_url);
              setSourceUrl(source_url);
            }}
          />
          <br />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default Index;
