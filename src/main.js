import { createApp } from 'vue';
import App from './App.vue';
import { getServerConfig } from './config';
import router from './router';
import { setupStore } from '/@/store';
import { injectResponsiveStorage } from '/@/utils/storage/responsive';
import { useDict } from '/@/hooks/useDict';
import { useI18n } from '../src/plugins/i18n';
import plugins from './plugins';
import { parseTime, resetForm, addDateRange, handleTree, selectDictLabel } from '/@/utils/tools';

// 样式导入
import './style/index.scss';
import 'virtual:windi.css';
import 'element-plus/dist/index.css';

// 字体图标导入
import './assets/iconfont/iconfont.js';
import './assets/iconfont/iconfont.css';
// svg图标
import elementIcons from '/@/components/SvgIcon/svgicon';
// 路由守卫(permission control)
import '/@/router/guard/permissionGuard';

const app = createApp(App);

/* 全局方法 */
app.config.globalProperties.useDict = useDict;
app.config.globalProperties.parseTime = parseTime;
app.config.globalProperties.resetForm = resetForm;
app.config.globalProperties.handleTree = handleTree;
app.config.globalProperties.addDateRange = addDateRange;
app.config.globalProperties.selectDictLabel = selectDictLabel;

/* 全局组件 */
import { IconifyIconOffline, FontIcon } from './components/WrIcon';
import SvgIcon from './components/SvgIcon/index.vue';
// 自定义表格工具组件
import RightToolbar from '/@/components/RightToolbar/index.vue';
// 字典标签组件
import DictTag from '/@/components/DictTag/index.vue';

app.component('FontIcon', FontIcon);
app.component('IconifyIconOffline', IconifyIconOffline);
app.component('svg-icon', SvgIcon);
app.component('RightToolbar', RightToolbar);
app.component('DictTag', DictTag);

// 注册自定义指令
import directive from './directive';

getServerConfig(app).then(async (config) => {
  app.use(router);
  await router.isReady();
  injectResponsiveStorage(app, config);
  setupStore(app);
  directive(app);
  app.use(plugins);
  app.use(useI18n);
  app.use(elementIcons);
  app.mount('#app');
});
