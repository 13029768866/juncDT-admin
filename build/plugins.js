import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import WindiCSS from 'vite-plugin-windicss';
import svgLoader from 'vite-svg-loader';
import VueI18n from '@intlify/vite-plugin-vue-i18n';
import themePreprocessorPlugin from '@pureadmin/theme';
import { genScssMultipleScopeVars } from '../src/layout/theme';

export function getPluginsList(command, VITE_LEGACY) {
  console.log(command, VITE_LEGACY);
  return [
    vue(),
    vueJsx(),
    // 国际化
    // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
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
    // 自定义主题
    themePreprocessorPlugin({
      scss: {
        multipleScopeVars: genScssMultipleScopeVars(),
        // 默认取 multipleScopeVars[0].scopeName
        defaultScopeName: '',
        // 在生产模式是否抽取独立的主题css文件，extract为true以下属性有效
        extract: true,
        // 独立主题css文件的输出路径，默认取 viteConfig.build.assetsDir 相对于 (viteConfig.build.outDir)
        outputDir: '',
        // 会选取defaultScopeName对应的主题css文件在html添加link
        themeLinkTagId: 'head',
        // "head"||"head-prepend" || "body" ||"body-prepend"
        themeLinkTagInjectTo: 'head',
        // 是否对抽取的css文件内对应scopeName的权重类名移除
        removeCssScopeName: false,
        // 可以自定义css文件名称的函数
        customThemeCssFileName: (scopeName) => scopeName,
      },
    }),
  ];
}
