# JuncDT

## 国际化

1. vue-i18n
2. @intlify/vite-plugin-vue-i18n

locals: 放置配置语言

src/plugins/ i18n: 混合框架国际化

## hamburger

1. el-menu 的控制 isCollapse

2. 侧边栏折叠，给 layout 添加 class 来实现

3. ```vue
   const set = reactive({ sidebar: computed(() => { return useAppStoreHook().sidebar; }), classes:
   computed(() => { return { hideSidebar: !set.sidebar.opened, openSidebar: set.sidebar.opened,
   withoutAnimation: set.sidebar.withoutAnimation, }; }), });
   ```
