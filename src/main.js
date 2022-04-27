import { createApp } from 'vue';
import App from './App.vue';
import { getServerConfig } from './config';
import router from './router';
import { setupStore } from '/@/store';

// 样式导入
import './style/index.scss';

const app = createApp(App);

// 注册自定义指令 todo
getServerConfig(app).then(async () => {
  // console.log(config);
  app.use(router);
  await router.isReady();
  setupStore(app);
  app.mount('#app');
});
