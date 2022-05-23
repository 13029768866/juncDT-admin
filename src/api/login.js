import request from '/@/utils/request';

// 登录
export const login = (data) => {
  return request({
    url: '/login',
    headers: { isToken: false },
    method: 'post',
    data,
  });
};

// 获取用户信息
export const getInfo = () => {
  return request({
    url: '/getInfo',
    method: 'get',
  });
};
