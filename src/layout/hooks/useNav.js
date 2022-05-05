import { remainingPaths } from '/@/router';
import { useAppStoreHook } from '/@/store/modules/app';

export function useNav() {
  const wrApp = useAppStoreHook();
  /* 菜单选择 */
  const menuSelect = (indexPath, routers) => {
    if (remainingPaths.includes(indexPath)) return;
    let parentPath = '';
    const parentPathIndex = indexPath.lastIndexOf('/');
    if (parentPathIndex > 0) {
      parentPath = indexPath.slice(0, parentPathIndex);
      console.log(parentPath);
    }
    const findCurrentRoute = (indexPath, routes) => {
      return routes.map((item) => {
        if (item.path === indexPath) {
          if (item.redirect) {
            findCurrentRoute(item.redirect, item.children);
          } else {
            /* 切换左侧菜单 通知标签页 */
            // emitter.emit('changLayoutRoute', {
            //   indexPath,
            //   parentPath,
            // });
          }
        } else {
          if (item.children) findCurrentRoute(indexPath, item.children);
        }
      });
    };
    findCurrentRoute(indexPath, routers);
  };

  /* 侧边栏切换 */
  const toggleSideBar = () => {
    wrApp.toggleSideBar();
  };

  return {
    wrApp,
    menuSelect,
    toggleSideBar,
  };
}
