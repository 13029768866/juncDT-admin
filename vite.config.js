import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { wrapperEnv } from './build'

// 进程的当前目录
const root = process.cwd();

// 路径查找
const pathResolve = dir => {
  return resolve(__dirname, ".", dir)
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode}) => {
  return {
    resolve: {
      /* 别名 */
      alias: {
        "/@": pathResolve("src")
      }
    },
    plugins: [vue()]
  }
})
