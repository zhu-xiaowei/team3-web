import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Space } from 'antd';
import React from 'react';
import { videoList } from '@/services/ant-design-pro/api';
import styles from './index.less';
// import { localStore } from '@/utils/utils';
// import VideoJS from './VideoJS'
import ReactPlayer from 'react-player';

const VideoList: React.FC = () => {
  // const srt_url= "https://d2zpi2271oxop7.cloudfront.net/appflow.vtt"
  const srt_url = 'https://d2zpi2271oxop7.cloudfront.net/app_flow.vtt';
  // const srt_url= "https://raw.githubusercontent.com/benwfreed/test-subtitles/master/mmvo72166981784.vtt"
  // 请求table数据
  const getVideoList = async () => {
    // const { userid } = JSON.parse(localStore.getItem('userInfo') || '{}');
    const params = {};
    try {
      const data = await videoList(params);

      // const data =  {
      //   code: 200,
      //   msg: 'success',
      //   data: {
      //     videoList: [{
      //       title: "视频1",
      //       thumbnail: "https://d2zpi2271oxop7.cloudfront.net/image/image.png",
      //       video_url: "https://d2zpi2271oxop7.cloudfront.net/video/appflow.mp4",
      //       srt_url: "https://raw.githubusercontent.com/benwfreed/test-subtitles/master/mmvo72166981784.vtt"
      //     }, {
      //       title: "视频2",
      //       thumbnail: "https://d2zpi2271oxop7.cloudfront.net/image/image.png",
      //       video_url: "https://d2zpi2271oxop7.cloudfront.net/video/appflow.mp4",
      //       srt_url: "https://d2zpi2271oxop7.cloudfront.net/appflow.vtt"
      //     }
      //     ]
      //   },
      // };
      // 请求成功
      console.log('---' + JSON.stringify(data));
      if (data && data.code === 200) {
        return {
          // @ts-ignore
          data: data.videoList,
          success: true,
          // @ts-ignore
          total: data.videoList.length,
        };
      }
    } catch (err) {
      console.log(err);
    }
    return {};
  };

  // @ts-ignore
  const columns: ProColumns<API.Video>[] = [
    {
      dataIndex: 'thumbnail',
      title: '',
      render: (dom, record) => (
        <Space>
          <div>
            <h3>{record.title}</h3>
            <ReactPlayer
              url={record.video_url}
              controls={true}
              config={{
                file: {
                  attributes: {
                    crossOrigin: 'anonymous',
                  },
                  tracks: [
                    { kind: 'subtitles', src: srt_url, srcLang: 'en', label: 'en', default: true },
                  ],
                },
              }}
              className={styles.imgStyle}
            />
            {/*<VideoJS />*/}
            {/*<video src={record.video_url} className={styles.imgStyle} controls/>*/}
          </div>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Video>
        columns={columns}
        // @ts-ignore
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
