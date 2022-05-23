import { defineStore } from 'pinia';
import { store } from '/@/store';
import { getToken, setToken } from '/@/utils/auth';
import { login, getInfo } from '/@/api/login';

export const useUserStore = defineStore({
  id: 'WR-user',
  state: () => ({
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
  }),
  getters: {
    getRoles() {
      return this.roles;
    },
  },
  actions: {
    SET_TOKEN(token) {
      this.token = token;
    },
    SET_ROLES(roles) {
      this.roles = roles;
    },
    SET_PERMISSIONS(permissions) {
      this.permissions = permissions;
    },
    // 登录
    Login(data) {
      return new Promise((resolve, reject) => {
        login(data)
          .then((res) => {
            setToken(res.data.token);
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    // 获取用户信息
    GetUserInfo() {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res) => {
            // 验证当前用户的角色权限
            if (res.data.roles && res.data.roles.length > 0) {
              this.SET_ROLES(res.data.roles);
              this.SET_PERMISSIONS(res.data.permissions);
              resolve(res);
            } else {
              // 设置默认权限 todo
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    // 退出登录
  },
});

export function useUserStoreHook() {
  return useUserStore(store);
}
