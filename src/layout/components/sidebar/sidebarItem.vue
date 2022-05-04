<template>
  <!--  没有子路由 -->
  <template
    v-if="
      hasOneShowingChild(props.item.children, props.item) &&
      (!onlyOneChild.children || onlyOneChild.noShowingChildren)
    "
  >
    <el-menu-item :index="resolvePath(onlyOneChild.path)">
      <template #title>
        <div>
          <el-tooltip placement="top" :offset="-10" :disabled="!onlyOneChild.showTooltip">
            <!--            <template #content>
              {{ onlyOneChild.meta.title }}
            </template>-->
            <span ref="menuTextRef">
              {{ transformI18n(onlyOneChild.meta.title, onlyOneChild.meta.i18n) }}
            </span>
          </el-tooltip>
        </div>
      </template>
    </el-menu-item>
  </template>

  <!--  存在子路由 -->
  <!--  <el-sub-menu v-else popper-append-to-body :index="resolvePath(props.item.path)">-->
  <!--    &lt;!&ndash;    <template #title>&ndash;&gt;-->
  <!--    &lt;!&ndash;      &lt;!&ndash;  icon  &ndash;&gt;&ndash;&gt;-->
  <!--    &lt;!&ndash;    </template>&ndash;&gt;-->
  <!--    &lt;!&ndash;    <sidebar-item&ndash;&gt;-->
  <!--    &lt;!&ndash;      v-for="child in props.item.children"&ndash;&gt;-->
  <!--    &lt;!&ndash;      :key="child.path"&ndash;&gt;-->
  <!--    &lt;!&ndash;      :is-nest="true"&ndash;&gt;-->
  <!--    &lt;!&ndash;      :item="child"&ndash;&gt;-->
  <!--    &lt;!&ndash;      :base-path="resolvePath(child.path)"&ndash;&gt;-->
  <!--    &lt;!&ndash;      class="nest-menu"&ndash;&gt;-->
  <!--    &lt;!&ndash;    />&ndash;&gt;-->
  <!--  </el-sub-menu>-->
</template>

<script setup>
  import { transformI18n } from '/@/plugins/i18n';

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
  const hasOneShowingChild = (children, parent) => {
    const showingChildren = children.filter((item) => {
      onlyOneChild.value = item;
      return true;
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
      return routePath;
    }
  };
</script>
