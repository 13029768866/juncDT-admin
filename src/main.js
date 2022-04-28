import { createApp } from 'vue';
import App from './App.vue';
import { getServerConfig } from './config';
import router from './router';
import { setupStore } from '/@/store';

// 样式导入
import './style/index.scss';

// 字体图标导入
import './assets/iconfont/iconfont.js';
import './assets/iconfont/iconfont.css';

const app = createApp(App);

import { FontIcon } from './components/WrIcon';
app.component('FontIcon', FontIcon);

// 注册自定义指令 todo
getServerConfig(app).then(async () => {
  // console.log(config);
  app.use(router);
  await router.isReady();
  setupStore(app);
  app.mount('#app');
});
