import { useRouter } from 'vue-router';
import { useAppStoreHook } from '/@/store/modules/app';
import { events } from '/@/utils/mitt';

const errorInfo = '当前路由配置不正确，请检查配置';

export function useNav() {
  const router = useRouter();
  const wrApp = useAppStoreHook();
  /* 菜单选择 */
  const menuSelect = (indexPath, routers) => {
    let parentPath = '';
    const parentPathIndex = indexPath.lastIndexOf('/');
    let target = '';
    if (parentPathIndex > 0) {
      parentPath = indexPath.slice(0, parentPathIndex);
      target = indexPath.slice(parentPathIndex + 1);
    }

    const findCurrentRoute = (indexPath, routes) => {
      if (!routes) return console.error(errorInfo);

      return routes.map((item) => {
        if (item.path === indexPath) {
          if (item.redirect) {
            findCurrentRoute(item.redirect, item.children);
          } else {
            /* 切换左侧菜单 通知标签页 */
            events.emit('changLayoutRoute', {
              indexPath,
              parentPath,
            });
          }
        } else {
          if (item.children) findCurrentRoute(indexPath, item.children);
        }
      });
    };
    findCurrentRoute(target, routers);
  };

  /* 侧边栏切换 */
  const isCollapse = computed(() => {
    return !wrApp.getSidebarStatus;
  });

  /* 打开项目配置 */
  const openPanel = () => {
    events.emit('openPanel');
  };
  /* 切换侧边栏 */
  const toggleSideBar = () => {
    wrApp.toggleSideBar();
  };

  /* 回到首页 */
  const backHome = () => {
    router.push('/dashboard');
  };
  return {
    wrApp,
    isCollapse,
    backHome,
    openPanel,
    menuSelect,
    toggleSideBar,
  };
}
