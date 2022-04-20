module.exports = {
  printWidth: 100, // 每行100个字符
  tabWidth: 2, // tab间隔
  useTabs: false, // 是否使用tab缩进而不是空格
  semi: true, // 语句结尾是否打印分号
  singleQuote: true, // 是否使用单引号
  quoteProps: 'as-needed', // 对象属性被引用修改时 as-needed(需要时候添加)，consistent(一个引用全部添加)，preserve(对象属性中使用)
  jsxSingleQuote: false, // jsx使用单引号
  trailingComma: 'es5', // 多行末尾逗号，es5(对象，数组es5中有效结尾逗号)，none（没有）,all(尽可能使用,现代浏览器需要babel转译支持node8，ES7)
  bracketSpacing: true, // 对象空格{ foo: bar }
  jsxBracketSameLine: false, // 开始标签结尾‘>’是否换行，false换行
  arrowParens: 'always', // 箭头函数参数是否带括号; always: (x) => x , avoid: x => x
  rangeStart: 0, // 文件格式化起始部分
  requirePragma: false, // 是否格式化文件顶部多行注释
  insertPragma: false, // 配合requirePragma给多行注释添加换行符
  proseWrap: 'never', // 换行规则; always(超过printWidth换行)，never（不换行，可以使用编译器换行规则），preserve（按照原样返回）
  htmlWhitespaceSensitivity: 'strict', // html内空格敏感度; strict(敏感)，ignore（忽视）, css(css现实属性默认值)
  vueIndentScriptAndStyle: true, // 是否缩进vue文件中的,<script>和<style>标签
  endOfLine: 'lf', // 结束行，linux默认‘lf’,配合.editorconfig解决windows结束行“crlf”报错问题
};
