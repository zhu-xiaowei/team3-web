import React from 'react';
import type { UploadFile, UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import { Upload$ } from '@/pages/video/upload/s3service';
import { UploadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

interface IParam {
  onProgress: ({}, f: UploadFile) => void;
  onSuccess: () => void;
  onError: () => void;
  file: UploadFile & { webkitRelativePath: string };
}

const props: UploadProps = {
  beforeUpload: (file) => {
    console.log(file.name);
    console.log(file.type);
    const isPic =
      file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg';
    if (!isPic) {
      message.error(`${file.name} is not a picture file`);
    }
    return isPic || Upload.LIST_IGNORE;
  },
  onChange: (info) => {
    console.log(info.fileList);
  },
};

export default class UploadPicComponent extends React.Component {
  public bucket: string = 'carlwe-bucket'; // 您要上传到的bucket名字

  static propTypes = {
    onResult: PropTypes.func,
  };

  private upload = (param: IParam) => {
    // @ts-ignore
    const { onResult } = this.props;
    const photoKey = encodeURIComponent('video') + '/' + param.file.name;
    Upload$(this.bucket, photoKey, param).subscribe(
      () => {
        onResult('https://carlwe-bucket.s3.ap-northeast-1.amazonaws.com/' + photoKey);
        console.log('成功');
      },
      () => console.log('失败'),
    );
  };

  public render() {
    return (
      // @ts-ignore
      <Upload {...props} customRequest={this.upload} maxCount={1}>
        <div>视频封面</div>
        <Button icon={<UploadOutlined />}>单击上传</Button>
      </Upload>
    );
  }
}
