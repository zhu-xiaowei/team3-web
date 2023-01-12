// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  plugins: ['react-dev-inspector/plugins/umi/react-inspector'],
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
  proxy: {
    '/default': {
      // target: 'http://127.0.0.1:8080',
      target: 'https://3edskgidf2.execute-api.us-east-1.amazonaws.com',
      changeOrigin: true,
      pathRewrite: { '^/server': '' },
    },
  },
});
