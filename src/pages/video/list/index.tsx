import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Space } from 'antd';
import React from 'react';
import { videoList } from '@/services/ant-design-pro/api';
import styles from './index.less';
import { localStore } from '@/utils/utils';

const VideoList: React.FC = () => {
  // 请求table数据
  const getVideoList = async () => {
    const { userid } = JSON.parse(localStore.getItem('userInfo') || '{}');
    const params = {
      userId: userid,
    };
    try {
      const data = await videoList(params);
      // 请求成功
      if (data && data.code === 0) {
        return {
          // @ts-ignore
          data: data.data.videoList,
          success: true,
          // @ts-ignore
          total: data.data.videoList.length,
        };
      }
    } catch (err) {
      console.log(err);
    }
    return {};
  };

  const columns: ProColumns<API.Video>[] = [
    {
      dataIndex: 'thumbnail',
      title: '视频封面',
      render: (dom, record) => (
        <Space>
          <img src={record.thumbnail} className={styles.imgStyle} />
        </Space>
      ),
    },
    {
      dataIndex: 'title',
      title: '视频标题',
    },
    {
      dataIndex: 'upload_time',
      width: 300,
      title: '上传时间',
    },
    {
      dataIndex: 'like_num',
      width: 150,
      title: '点赞',
    },
    {
      dataIndex: 'unlike_num',
      width: 150,
      title: '踩',
    },
    {
      dataIndex: 'hls_state',
      width: 150,
      title: '转码状态',
      render: (_, record) => {
        if (record.hls_state === 1) {
          return '转码成功';
        } else if (record.hls_state === 2) {
          return '转码失败';
        } else {
          return '转码中';
        }
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Video>
        columns={columns}
        request={getVideoList}
        rowKey="outUserNo"
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        toolBarRender={false}
        search={false}
      />
    </PageContainer>
  );
};
export default VideoList;
