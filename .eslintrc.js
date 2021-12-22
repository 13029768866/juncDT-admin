module.exports = {
  // 表示当前目录即为根目录，ESLint 规则将被限制到该目录下
  root: true,
  env: {
    // 在 node 环境下启动 ESLint 检测
    node: true,
  },
  // ESLint 中基础配置需要继承的配置
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/prettier'],
  // 解析器
  parser: 'vue-eslint-parser',
  // 规则
  rules: {
    'no-undef': 'off', // 解决defineXXX需要引入问题，关闭校验
  },
};
