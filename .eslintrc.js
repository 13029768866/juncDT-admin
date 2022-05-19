module.exports = {
  // 需要启动的环境
  env: {
    browser: true, // 浏览器环境中的全局变量
    es2021: true, // 添加所有 ECMAScript 2021 全局变量
    node: true, // Node.js 全局变量和 Node.js 作用域
  },
  // 继承额外eslint配置
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/prettier',
    'plugin:prettier/recommended',
  ],
  // 解析器选项
  parserOptions: {
    ecmaVersion: 12, // es12版本  https://blog.csdn.net/TIAN20121221/article/details/114648905
    sourceType: 'module', // ECMAScript 模块
    extraFileExtensions: ['.vue'],
  },
  // eslint plugins 存放你要使用的插件列表
  plugins: ['vue'],
  rules: {
    /* 此处针对console以及debugger 最好采用babel-plugin-transform-remove-console
 以及 vite 采用的 minify 选项 在打包的时候关闭debugger及console */
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-shadow': 'off', // 局部变量与其包含范围内的变量共享相同名称
    'no-bitwise': 'off', // 禁止使用按位操作符
    'no-undef': 'off', // 禁止使用为什么变量
    'default-case': 'off', // 要求switch语句必须要有default
    'no-plusplus': 'off', // 禁止使用一元操作符
    'no-useless-escape': 'off',
    'no-param-reassign': 'off', // 禁止分配函数参数
    'no-underscore-dangle': 'off', // 命名下划线
    'class-methods-use-this': 'off', // class 静态方法限制
    'prefer-destructuring': ['error', { object: true, array: false }], // 强制object使用解构
    // eslint-plugin-import
    'import/no-extraneous-dependencies': 'off', // 检查package.json判断哪些需要采用dependencies注入 关闭 原因一些依赖组件依赖项 会出现一些检测错误
    'vue/multi-word-component-names': 'off', // 解决组件mul-compoent报错
    // typescript-eslint
    // '@typescript-eslint/no-unused-vars': [
    //   // 未使用过的变量处理
    //   'error',
    //   {
    //     argsIgnorePattern: '^_',
    //     varsIgnorePattern: '^_',
    //   },
    // ],
    // '@typescript-eslint/ban-ts-comment': 'off', // 允许使用ts-ignore
    // '@typescript-eslint/no-explicit-any': 'off', // 禁止使用any类型
    // '@typescript-eslint/no-non-null-assertion': 'off', // 禁止使用非空断言
    // '@typescript-eslint/explicit-function-return-type': 'off', // 需要函数的返回类型
    // '@typescript-eslint/explicit-module-boundary-types': 'off', // 指定导出数据类型
  },
  overrides: [
    {
      files: ['*.vue'],
      // vue文件采用 vue-eslint-parser 处理器
      parser: require.resolve('vue-eslint-parser'),
    },
  ],
};
