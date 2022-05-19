<template>
  <div v-if="!showTags" ref="containerDom" class="tags-view">
    <!-- 左侧tag -->
    <div class="arrow-left">
      <IconifyIconOffline icon="arrow-left-s-line" @click="handleScroll(200)" />
    </div>
    <!-- tag栏 -->
    <div ref="scrollbarDom" class="scroll-container">
      <div ref="tabDom" class="tab" :style="getTabStyle">
        <div
          v-for="(item, index) in multiTags"
          :ref="'dynamic' + index"
          :key="index"
          :class="['scroll-item is-closable', linkIsActive(item)]"
          @mouseenter.prevent="onMouseenter(index)"
          @mouseleave.prevent="onMouseleave(index)"
          @click="tagOnClick(item)"
        >
          <router-link :to="item.path">
            {{ transformI18n(item.meta.title, item.meta.i18n) }}
          </router-link>
          <span
            v-if="iconIsActive(item, index) || (index === activeIndex && index !== 0)"
            class="el-icon-close"
            @click.stop="deleteMenu(item)"
          >
            <IconifyIconOffline icon="close-bold" />
          </span>
        </div>
      </div>
    </div>
    <span class="arrow-right">
      <IconifyIconOffline icon="arrow-right-s-line" @click="handleScroll(-200)" />
    </span>
    <!-- 右侧功能按钮 -->
    <ul class="right-button">
      <li>
        <span
          :title="t('buttons.refreshRoute')"
          class="el-icon-refresh-right rotate"
          @click="onFresh"
        >
          <IconifyIconOffline icon="refresh-right" />
        </span>
      </li>
      <li>
        <el-dropdown trigger="click" placement="bottom-end" @command="handleCommand">
          <IconifyIconOffline icon="arrow-down" />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(item, key) in tagsViews"
                :key="key"
                :command="{ key, item }"
                :divided="item.divided"
                :disabled="item.disabled"
              >
                <component :is="item.icon" :key="key" style="margin-right: 6px" />
                {{ t(item.text) }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n';
  import { $t, transformI18n } from '/@/plugins/i18n';
  import { events } from '/@/utils/mitt';
  import { storageLocal } from '/@/utils/storage';
  import { isEqual, isEmpty } from 'lodash-unified';
  import { handleAliveRoute, delAliveRoutes } from '/@/router/utils';
  import { toggleClass, removeClass, hasClass } from '/@/utils/operate';
  import { templateRef } from '@vueuse/core';

  import { useMultiTagsStoreHook } from '/@/store/modules/multiTags';
  import { usePermissionStoreHook } from '/@/store/modules/permission';

  import close from '/@/assets/svg/close.svg?component';
  import refresh from '/@/assets/svg/refresh.svg?component';
  import closeAll from '/@/assets/svg/close_all.svg?component';
  import closeLeft from '/@/assets/svg/close_left.svg?component';
  import closeOther from '/@/assets/svg/close_other.svg?component';
  import closeRight from '/@/assets/svg/close_right.svg?component';

  const { t } = useI18n();
  const route = useRoute();
  const router = useRouter();
  const instance = getCurrentInstance();
  const showTags = ref(storageLocal.getItem('responsive-configure').hideTabs) ?? 'false';

  // 标签栏
  let multiTags = computed(() => {
    return useMultiTagsStoreHook()?.multiTags;
  });

  /* 左侧tag栏 start */
  const translateX = ref(0);
  const activeIndex = ref(-1);
  // 滚动计算元素
  const tabDom = templateRef('tabDom', null);
  const containerDom = templateRef('containerDom', null);
  const scrollbarDom = templateRef('scrollbarDom', null);
  const getTabStyle = computed(() => {
    return {
      transform: `translateX(${translateX.value}px)`,
    };
  });
  const tabNavPadding = 10;

  const moveToView = (index) => {
    if (!instance.refs['dynamic' + index]) {
      return;
    }
    const tabItemEl = instance.refs['dynamic' + index][0];
    const tabItemElOffsetLeft = tabItemEl?.offsetLeft;
    const tabItemOffsetWidth = tabItemEl?.offsetWidth;
    // 标签页导航栏可视长度（不包含溢出部分）
    const scrollbarDomWidth = scrollbarDom.value ? scrollbarDom.value?.offsetWidth : 0;
    // 已有标签页总长度（包含溢出部分）
    const tabDomWidth = tabDom.value ? tabDom.value?.offsetWidth : 0;

    if (tabDomWidth < scrollbarDomWidth || tabItemElOffsetLeft === 0) {
      translateX.value = 0;
    } else if (tabItemElOffsetLeft < -translateX.value) {
      // 标签在可视区域左侧
      translateX.value = -tabItemElOffsetLeft + tabNavPadding;
    } else if (
      tabItemElOffsetLeft > -translateX.value &&
      tabItemElOffsetLeft + tabItemOffsetWidth < -translateX.value + scrollbarDomWidth
    ) {
      // 标签在可视区域
      translateX.value = Math.min(
        0,
        scrollbarDomWidth - tabItemOffsetWidth - tabItemElOffsetLeft - tabNavPadding
      );
    } else {
      // 标签在可视区域右侧
      translateX.value = -(
        tabItemElOffsetLeft -
        (scrollbarDomWidth - tabNavPadding - tabItemOffsetWidth)
      );
    }
  };
  // 左右切换
  const handleScroll = (offset) => {
    const scrollbarDomWidth = scrollbarDom.value ? scrollbarDom.value?.offsetWidth : 0;
    const tabDomWidth = tabDom.value ? tabDom.value.offsetWidth : 0;
    if (offset > 0) {
      translateX.value = Math.min(0, translateX.value + offset);
    } else {
      if (scrollbarDomWidth < tabDomWidth) {
        if (translateX.value >= -(tabDomWidth - scrollbarDomWidth)) {
          translateX.value = Math.max(translateX.value + offset, scrollbarDomWidth - tabDomWidth);
        }
      } else {
        translateX.value = 0;
      }
    }
  };

  // 当前选中项
  const linkIsActive = computed(() => {
    return (item) => {
      if (Object.keys(route.query).length === 0) {
        if (route.path === item.path) {
          return 'is-active';
        } else {
          return '';
        }
      } else {
        if (isEqual(route?.query, item?.query)) {
          return 'is-active';
        } else {
          return '';
        }
      }
    };
  });
  const iconIsActive = computed(() => {
    return (item, index) => {
      if (index === 0) return;
      if (Object.keys(route.query).length === 0) {
        if (route.path === item.path) {
          return true;
        } else {
          return false;
        }
      } else {
        if (isEqual(route?.query, item?.query)) {
          return true;
        } else {
          return false;
        }
      }
    };
  });

  // 动态tag栏
  function dynamicRouteTag(value, parentPath) {
    const hasValue = multiTags.value.some((item) => {
      return item.path === value;
    });
    function concatPath(arr, value, parentPath) {
      if (!hasValue) {
        arr.forEach((arrItem) => {
          let pathConcat = parentPath + arrItem.path;
          if (arrItem.path === value || pathConcat === value) {
            useMultiTagsStoreHook().handleTags('push', {
              path: value,
              parentPath: `/${parentPath.split('/')[1]}`,
              meta: arrItem.meta,
              name: arrItem.name,
            });
          } else {
            if (arrItem.children && arrItem.children.length > 0) {
              concatPath(arrItem.children, value, parentPath);
            }
          }
        });
      }
    }
    concatPath(router.options.routes, value, parentPath);
  }

  // 触发tags标签切换
  function tagOnClick(item) {
    router.push({
      path: item?.path,
      query: item?.query,
    });
    showMenuModel(item?.path, item?.query);
  }

  // 鼠标移入
  function onMouseenter(index) {
    if (index) activeIndex.value = index;
    if (hasClass(instance.refs['dynamic' + index][0], 'card-active')) return;
    toggleClass(true, 'card-in', instance.refs['dynamic' + index][0]);
    toggleClass(false, 'card-out', instance.refs['dynamic' + index][0]);
  }

  // 鼠标移出
  function onMouseleave(index) {
    activeIndex.value = -1;
    if (hasClass(instance.refs['dynamic' + index][0], 'card-active')) return;
    toggleClass(false, 'card-in', instance.refs['dynamic' + index][0]);
    toggleClass(true, 'card-out', instance.refs['dynamic' + index][0]);
  }

  /* 左侧tag栏 end */

  /* 右侧tags操作栏 start */
  const tagsViews = reactive([
    {
      icon: markRaw(refresh),
      text: $t('buttons.reload'),
      divided: false,
      disabled: false,
      show: true,
    },
    {
      icon: markRaw(close),
      text: $t('buttons.closeCurrentTab'),
      divided: false,
      disabled: multiTags.value.length > 1 ? false : true,
      show: true,
    },
    {
      icon: markRaw(closeLeft),
      text: $t('buttons.closeLeftTabs'),
      divided: true,
      disabled: multiTags.value.length > 1 ? false : true,
      show: true,
    },
    {
      icon: markRaw(closeRight),
      text: $t('buttons.closeRightTabs'),
      divided: false,
      disabled: multiTags.value.length > 1 ? false : true,
      show: true,
    },
    {
      icon: markRaw(closeOther),
      text: $t('buttons.closeOtherTabs'),
      divided: true,
      disabled: multiTags.value.length > 2 ? false : true,
      show: true,
    },
    {
      icon: markRaw(closeAll),
      text: $t('buttons.closeAllTabs'),
      divided: false,
      disabled: multiTags.value.length > 1 ? false : true,
      show: true,
    },
  ]);
  let refreshButton = 'refresh-button';

  function showMenus(value) {
    Array.of(1, 2, 3, 4, 5).forEach((v) => {
      tagsViews[v].show = value;
    });
  }

  function disabledMenus(value) {
    Array.of(1, 2, 3, 4, 5).forEach((v) => {
      tagsViews[v].disabled = value;
    });
  }
  // 检查当前右键的菜单两边是否存在别的菜单，如果左侧的菜单是首页，则不显示关闭左侧标签页，如果右侧没有菜单，则不显示关闭右侧标签页
  function showMenuModel(currentPath, query, refresh) {
    let allRoute = multiTags.value;
    let routeLength = multiTags.value.length;
    let currentIndex = -1;
    if (isEmpty(query)) {
      currentIndex = allRoute.findIndex((v) => v.path === currentPath);
    } else {
      currentIndex = allRoute.findIndex((v) => isEqual(v.query, query));
    }
    showMenus(true);

    if (refresh) {
      tagsViews[0].show = true;
    }

    /**
     * currentIndex为1时，左侧的菜单是首页，则不显示关闭左侧标签页
     * 如果currentIndex等于routeLength-1，右侧没有菜单，则不显示关闭右侧标签页
     */
    if (currentIndex === 1 && routeLength !== 2) {
      // 左侧的菜单是首页，右侧存在别的菜单
      tagsViews[2].show = false;
      Array.of(1, 3, 4, 5).forEach((v) => {
        tagsViews[v].disabled = false;
      });
      tagsViews[2].disabled = true;
    } else if (currentIndex === 1 && routeLength === 2) {
      disabledMenus(false);
      // 左侧的菜单是首页，右侧不存在别的菜单
      Array.of(2, 3, 4).forEach((v) => {
        tagsViews[v].show = false;
        tagsViews[v].disabled = true;
      });
    } else if (routeLength - 1 === currentIndex && currentIndex !== 0) {
      // 当前路由是所有路由中的最后一个
      tagsViews[3].show = false;
      Array.of(1, 2, 4, 5).forEach((v) => {
        tagsViews[v].disabled = false;
      });
      tagsViews[3].disabled = true;
    } else if (currentIndex === 0 || currentPath === '/redirect/dashboard') {
      // 当前路由为首页
      if (routeLength >= 2) {
        disabledMenus(true);
        Array.of(3, 4, 5).forEach((v) => {
          tagsViews[v].disabled = false;
        });
      } else {
        disabledMenus(true);
      }
    } else {
      disabledMenus(false);
    }
  }

  // 重新加载
  function onFresh() {
    toggleClass(true, refreshButton, document.querySelector('.rotate'));
    const { fullPath, query } = unref(route);
    router.replace({
      path: '/redirect' + fullPath,
      query: query,
    });
    setTimeout(() => {
      removeClass(document.querySelector('.rotate'), refreshButton);
    }, 600);
  }

  function deleteDynamicTag(obj, current, tag) {
    // 存放被删除的缓存路由
    let delAliveRouteList = [];
    let valueIndex = multiTags.value.findIndex((item) => {
      if (item.query) {
        if (item.path === obj.path) {
          return item.query === obj.query;
        }
      } else {
        return item.path === obj.path;
      }
    });

    const spliceRoute = (startIndex, length, other) => {
      if (other) {
        useMultiTagsStoreHook().handleTags('equal', [
          {
            path: '/dashboard',
            parentPath: '/',
            meta: {
              title: 'menus.workbench',
              i18n: true,
              icon: 'home-filled',
            },
          },
          obj,
        ]);
      } else {
        delAliveRouteList = useMultiTagsStoreHook().handleTags('splice', '', {
          startIndex,
          length,
        });
      }
    };

    if (tag === 'other') {
      spliceRoute(1, 1, true);
    } else if (tag === 'left') {
      spliceRoute(1, valueIndex - 1);
    } else if (tag === 'right') {
      spliceRoute(valueIndex + 1, multiTags.value.length);
    } else {
      // 从当前匹配到的路径中删除
      spliceRoute(valueIndex, 1);
    }
    let newRoute = useMultiTagsStoreHook().handleTags('slice');
    if (current === route.path) {
      // 删除缓存路由
      tag ? delAliveRoutes(delAliveRouteList) : handleAliveRoute(route.matched, 'delete');
      // 如果删除当前激活tag就自动切换到最后一个tag
      if (tag === 'left') return;
      nextTick(() => {
        router.push({
          path: newRoute[0].path,
          query: newRoute[0].query,
        });
      });
    } else {
      // 删除缓存路由
      tag ? delAliveRoutes(delAliveRouteList) : delAliveRoutes([obj]);
      if (!multiTags.value.length) return;
      let isHasActiveTag = multiTags.value.some((item) => {
        return item.path === route.path;
      });
      !isHasActiveTag &&
        router.push({
          path: newRoute[0].path,
          query: newRoute[0].query,
        });
    }
  }

  function deleteMenu(item, tag) {
    deleteDynamicTag(item, item.path, tag);
  }

  function onClickDrop(key, item, selectRoute) {
    if (item && item.disabled) return;

    let selectTagRoute;
    if (selectRoute) {
      selectTagRoute = {
        path: selectRoute.path,
        meta: selectRoute.meta,
        name: selectRoute.name,
        query: selectRoute.query,
      };
    } else {
      selectTagRoute = { path: route.path, meta: route.meta };
    }

    // 当前路由信息
    switch (key) {
      case 0:
        // 重新加载
        onFresh();
        break;
      case 1:
        // 关闭当前标签页
        deleteMenu(selectTagRoute);
        break;
      case 2:
        // 关闭左侧标签页
        deleteMenu(selectTagRoute, 'left');
        break;
      case 3:
        // 关闭右侧标签页
        deleteMenu(selectTagRoute, 'right');
        break;
      case 4:
        // 关闭其他标签页
        deleteMenu(selectTagRoute, 'other');
        break;
      case 5:
        // 关闭全部标签页
        useMultiTagsStoreHook().handleTags('splice', '', {
          startIndex: 1,
          length: multiTags.value.length,
        });
        usePermissionStoreHook().clearAllCachePage();
        router.push('/dashboard');
        break;
    }
    setTimeout(() => {
      showMenuModel(route.fullPath, route.query);
    });
  }

  function handleCommand(command) {
    const { key, item } = command;
    onClickDrop(key, item);
  }
  /* 右侧tags操作栏 end */

  const dynamicTagView = () => {
    const index = multiTags.value.findIndex((item) => {
      if (item?.query) {
        return isEqual(route?.query, item?.query);
      } else {
        return item.path === route.path;
      }
    });
    moveToView(index);
  };

  watch([route], () => {
    activeIndex.value = -1;
    dynamicTagView();
  });
  onBeforeMount(() => {
    if (!instance) return;

    showMenuModel(route.fullPath);
    //  接收侧边栏切换传递过来的参数
    events.on('changLayoutRoute', ({ indexPath, parentPath }) => {
      dynamicRouteTag(indexPath, parentPath);
      setTimeout(() => {
        showMenuModel(indexPath);
      });
    });

    // 触发隐藏标签页
    events.on('tagViewsChange', (key) => {
      if (unref(showTags) === key) return;
      showTags.value = key;
    });
  });
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
