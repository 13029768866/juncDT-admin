import request from '/@/utils/request';

export const getRoutes = () => {
  return request({
    url: '/getRouters',
    method: 'get',
  });
};
