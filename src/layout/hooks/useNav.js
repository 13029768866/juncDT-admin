import { remainingPaths } from '/@/router';

export function useNav() {
  /* 菜单选择 */
  const menuSelect = (indexPath, routers) => {
    if (remainingPaths.includes(indexPath)) return;
    let parentPath = '';
    const parentPathIndex = indexPath.lastIndexOf('/');
    if (parentPathIndex > 0) {
      parentPath = indexPath.slice(0, parentPathIndex);
    }
    /* */
    const findCurrentRoute = (indexPath, routes) => {
      return routes.map((item) => {
        if (item.path === indexPath) {
          if (item.redirect) {
            findCurrentRoute(item.redirect, item.children);
          } else {
            /* 切换左侧菜单 通知标签页 */
            console.log('eslint-ignore', parentPath);
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

  return {
    menuSelect,
  };
}
