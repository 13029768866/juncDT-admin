import axios from 'axios';

let config = {};
const { VITE_PUBLIC_PATH } = import.meta.env;

export const setConfig = (cfg) => {
  config = Object.assign(config, cfg);
};
export const getConfig = (key) => {
  if (typeof key === 'string') {
    const arr = key.split('.');
    if (arr && arr.length) {
      let data = config;
      arr.forEach((v) => {
        if (data && typeof data[v] !== 'undefined') {
          data = data[v];
        } else {
          data = null;
        }
      });
      return data;
    }
  }
  return config;
};

// 获取项目动态全局配置
export const getServerConfig = async (app) => {
  // 注册成全局属性
  app.config.globalProperties.$config = getConfig();
  return axios({
    baseURL: '',
    method: 'get',
    url: `${VITE_PUBLIC_PATH}serverConfig.json`,
  }).then(({ data }) => {
    let { $config } = app.config.globalProperties;
    // 自动注入项目配置
    if (app && $config && typeof config === 'object') {
      $config = Object.assign($config, data);
      app.config.globalProperties.$config = $config;
      // 设置全局配置
      setConfig($config);
    }
    // 设置全局baseURL
    app.config.globalProperties.$baseUrl = $config.baseURL;
    return $config;
  });
};
