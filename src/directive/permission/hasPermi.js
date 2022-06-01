/**
 * v-hasPermi 操作权限处理
 * Copyright (c) 2022 WoodensRanger
 */
import { useUserStoreHook } from '/@/store/modules/user';

export default {
  mounted(el, binding) {
    const { value } = binding;
    const all_permission = '*:*:*';
    const permissions = useUserStoreHook().getPermissions;

    if (value && Array.isArray(value) && value.length > 0) {
      const permissionFlag = value;
      const hasPermissions = permissions.some((permission) => {
        return all_permission === permission || permissionFlag.includes(permission);
      });

      // 删除本身
      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`请设置操作权限标签值`);
    }
  },
};
