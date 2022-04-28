import { createApp } from 'vue';
import App from './App.vue';
import { getServerConfig } from './config';
import router from './router';
import { setupStore } from '/@/store';
import { useI18n } from '../src/plugins/i18n';
import { injectResponsiveStorage } from '/@/utils/storage/responsive';

// 样式导入
import './style/index.scss';

// 字体图标导入
import './assets/iconfont/iconfont.js';
import './assets/iconfont/iconfont.css';

const app = createApp(App);

import { IconifyIconOffline, FontIcon } from './components/WrIcon';
app.component('FontIcon', FontIcon);
app.component('IconifyIconOffline', IconifyIconOffline);

// 注册自定义指令 todo

getServerConfig(app).then(async () => {
  // console.log(config);
  app.use(router);
  await router.isReady();
  injectResponsiveStorage(app);
  setupStore(app);
  app.use(useI18n);
  app.mount('#app');
});
