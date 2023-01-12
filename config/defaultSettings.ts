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
  title: '不卷教育',
  pwa: false,
  logo: 'https://d2zpi2271oxop7.cloudfront.net/image/bujuan_logo.png',
  iconfontUrl: '',
};

export default Settings;
