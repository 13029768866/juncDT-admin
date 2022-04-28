import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import WindiCSS from 'vite-plugin-windicss';
import svgLoader from 'vite-svg-loader';
import VueI18n from '@intlify/vite-plugin-vue-i18n';

export function getPluginsList(command, VITE_LEGACY) {
  console.log(command, VITE_LEGACY);
  return [
    vue(),
    vueJsx(),
    // 国际化
    //
    VueI18n({
      include: [resolve('locales/**')],
    }),
    // 自动导入
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core'],
    }),
    // 组件自动按需加载
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // 原子化css库
    WindiCSS(),
    // svg组件化支持
    svgLoader(),
  ];
}
