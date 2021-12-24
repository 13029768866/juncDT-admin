import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
// 自动按需加载
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
// svg处理
import viteSvgIcons from 'vite-plugin-svg-icons';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
    viteSvgIcons({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
});
