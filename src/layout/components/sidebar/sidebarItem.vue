<template>
  <div v-if="!props.item.hidden">
    <!--  没有子路由 -->
    <template
      v-if="
        hasOneShowingChild(props.item.children, props.item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren)
      "
    >
      <el-menu-item
        :index="resolvePath(onlyOneChild.path)"
        :class="{ 'submenu-title-noDropdown': !isNest }"
      >
        <!-- icon  -->
        <div class="el-icon" v-if="onlyOneChild.meta.icon">
          <svg-icon :icon-class="onlyOneChild.meta.icon" />
        </div>
        <!-- title -->
        <template #title>
          <div>
            <el-tooltip placement="top" :offset="-10" :disabled="!onlyOneChild.showTooltip">
              <span ref="menuTextRef">
                {{ locale == 'en' ? onlyOneChild.meta?.titleEn : onlyOneChild.meta?.title }}
              </span>
            </el-tooltip>
          </div>
        </template>
      </el-menu-item>
    </template>
    <!--  存在子路由 -->
    <el-sub-menu v-else popper-append-to-body :index="resolvePath(props.item.path)">
      <template #title>
        <!--  icon  -->
        <div class="el-icon" v-if="onlyOneChild.meta.icon">
          <svg-icon :icon-class="props.item.meta.icon" />
        </div>
        <!-- title -->
        <el-tooltip placement="top" :offset="-10" :disabled="!props.item.showTooltip">
          <div ref="menuTextRef" overflow="hidden" :style="getSubTextStyle">
            <span> {{ locale == 'en' ? props.item.meta?.titleEn : props.item.meta?.title }} </span>
          </div>
        </el-tooltip>
      </template>
      <sidebar-item
        v-for="child in props.item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup>
  import path from 'path';
  import { useI18n } from 'vue-i18n';
  import { useNav } from '../../hooks/useNav';

  const { locale } = useI18n();
  const { wrApp } = useNav();
  const props = defineProps({
    item: {
      type: Object,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: '',
    },
  });
  /* 菜单子路由处理 */
  const onlyOneChild = ref(null);
  const hasOneShowingChild = (children = [], parent) => {
    // 根据hidden显示
    const showingChildren = children.filter((item) => {
      if (item.hidden) {
        return false;
      } else {
        onlyOneChild.value = item;
        return true;
      }
    });

    // 是否显示父级
    if (showingChildren[0]?.meta?.showParent) {
      return false;
    }

    if (showingChildren.length === 0) {
      onlyOneChild.value = { ...parent, path: '', noShowingChildren: true };
      return true;
    }
    // 只有一级的时候特殊处理,不显示父级
    if (showingChildren.length === 1) {
      return true;
    }
    return false;
  };

  /* 解析路由 */
  const resolvePath = (routePath) => {
    const httpReg = /^http(s?):\/\//;
    if (httpReg.test(routePath) || httpReg.test(props.basePath)) {
      return routePath || props.basePath;
    } else {
      return path.resolve(props.basePath, routePath);
    }
  };

  /* 样式控制 */
  const getSubTextStyle = computed(() => {
    return {
      width: wrApp.sidebar.opened ? '125px' : '',
    };
  });

  // 存储菜单文本dom元素
  const menuTextRef = ref(null);
</script>
