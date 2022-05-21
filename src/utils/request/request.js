import axios from 'axios';
import { loadEnv } from '@build/index';
import { getToken } from '../auth';
import { tansParams } from '../tools';
import { storageSession } from '../storage';
import errorCode from '@/utils/errorCode';
import { ElNotification, ElMessageBox, ElMessage } from 'element-plus';

// 是否显示重新登录
export let isRelogin = { show: false };
/* axios 实例 */
const { VITE_PROXY_DOMAIN, VITE_PROXY_DOMAIN_REAL } = loadEnv();
const instance = axios.create({
  // 请求URL公共部分
  baseURL: process.env.NODE_ENV === 'production' ? VITE_PROXY_DOMAIN_REAL : VITE_PROXY_DOMAIN,
  // 超时时间
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

/* 请求拦截 */
instance.interceptors.request.use(
  (config) => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false;
    // 是否需要防止数据重复提交
    const isRepeatSubmit = (config.headers || {}).repeatSubmit === false;
    if (getToken() && !isToken) {
      // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers['Authorization'] = 'Bearer ' + getToken();
    }
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = config.url + '?' + tansParams(config.params);
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }
    if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
      const requestObj = {
        url: config.url,
        data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
        time: new Date().getTime(),
      };
      const sessionObj = storageSession.getItem('sessionObj');
      console.log('sessionObj', sessionObj);
      if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
        storageSession.setItem('sessionObj', requestObj);
      } else {
        const s_url = sessionObj.url; // 请求地址
        const s_data = sessionObj.data; // 请求数据
        const s_time = sessionObj.time; // 请求时间
        const interval = 1000; // 间隔时间(ms)，小于此时间视为重复提交
        if (
          s_data === requestObj.data &&
          requestObj.time - s_time < interval &&
          s_url === requestObj.url
        ) {
          const message = '数据正在处理，请勿重复提交';
          console.warn(`[${s_url}]: ` + message);
          return Promise.reject(new Error(message));
        } else {
          storageSession.setItem('sessionObj', requestObj);
        }
      }
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

/* 响应拦截 */
instance.interceptors.response.use(
  (res) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || '200';
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode['default'];
    // 二进制数据则直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
      return res.data;
    }
    if (code === '401') {
      if (!isRelogin.show) {
        isRelogin.show = true;
        ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            isRelogin.show = false;
            console.log('执行退出登录操作');
            // store.dispatch('LogOut').then(() => {
            //   location.href = '/dataCenter/web/index';
            // });
          })
          .catch(() => {
            isRelogin.show = false;
          });
      }
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。');
    } else if (code === '500') {
      ElMessage({
        message: msg,
        type: 'error',
      });
      return Promise.reject(new Error(msg));
    } else if (code !== '200') {
      ElNotification.error({
        title: msg,
      });
      return Promise.reject('error');
    } else {
      return res.data;
    }
  },
  (error) => {
    console.log('err' + error);
    let { message } = error;
    if (message == 'Network Error') {
      message = '后端接口连接异常';
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时';
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常';
    }
    ElMessage({
      message: message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default instance;
