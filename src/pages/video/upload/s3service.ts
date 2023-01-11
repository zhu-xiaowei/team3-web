import { Subject } from 'rxjs';
import type { AWSError } from 'aws-sdk';
import AWS, { S3 } from 'aws-sdk';
import type { PutObjectOutput } from 'aws-sdk/clients/s3';
import type { UploadFile } from 'antd';

// 对S3进行配置
export const createS3 = () => {
  AWS.config.update({
    region: 'ap-northeast-1',
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'ap-northeast-1:d14de07d-7c6d-4d40-ad30-774a04dbeab7',
    }),
  });

  const s3 = new S3({
    apiVersion: '2006-03-01',
  });
  return s3;
};

interface IUpload {
  onProgress?: ({}, f: UploadFile) => void; // 需要重写的antd的progress函数
  onSuccess?: () => void; // antd中progress百分百时的成功函数
  file: UploadFile; // 上传失败的progress函数
  onError: () => void;
}

export const Upload$ = (bucket: string, key: string, body: IUpload): Subject<PutObjectOutput> => {
  const s3 = createS3(); //传入您的S3令牌
  const s3subject = new Subject(); //创建一个Subject主体

  s3.putObject(
    // s3上面的putObject方法 第一个参数是一个对象，第二个参数是一个函数，函数有两个值，1.表示上传失败，2.表示上传成功
    {
      Body: body.file, // 是文件类型
      Bucket: bucket, // 对应S3上的bucket
      Key: key, // 需要上传到的路径
      GrantReadACP: 'uri=http://acs.amazonaws.com/groups/global/AllUsers',
      GrantRead: 'uri=http://acs.amazonaws.com/groups/global/AllUsers',
    },
    (err: AWSError, resp: PutObjectOutput) => {
      if (err) {
        console.log(err);
        s3subject.error(err); // 上传失败时调用
      } else {
        s3subject.next(resp); // 上传成功时调用
      }
    },
  )
    .on('httpUploadProgress', (progress) => {
      // 上传S3时‘httpUploadProgress’函数里可以定义progress
      console.log('httpUploadProgress:' + progress);
      const percent = (100 * progress.loaded) / progress.total;
      // body.onProgress 是antd中的onProgress 重写的progress
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      body.onProgress ? body.onProgress({ percent }, body.file) : void 0;
      if (percent === 100 && body.onSuccess) body.onSuccess(); // 上传到百分百时调用 antd中的onSuccess
    })
    .on('httpError', (err) => {
      if (err && body.onError) {
        body.onError();
        s3subject.error(err);
      }
    });
  // @ts-ignore
  return s3subject;
};
