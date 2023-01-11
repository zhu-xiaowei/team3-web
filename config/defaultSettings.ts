import { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '培训视频',
  pwa: false,
  logo: 'https://carlwe-bucket.s3.ap-northeast-1.amazonaws.com/aws.jpg',
  iconfontUrl: '',
};

export default Settings;
