import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import WindiCSS from 'vite-plugin-windicss';

export function getPluginsList(command, VITE_LEGACY) {
  console.log(command, VITE_LEGACY);
  return [
    vue(),
    vueJsx(),
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
  ];
}
