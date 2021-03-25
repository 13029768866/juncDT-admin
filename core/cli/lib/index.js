'use strict';

module.exports = core;

// require支持资源类型: .js,.json,.node
// .js => module.exports / exports
// .json => JSON.parse解析输出一个JSON对象
// .node => C++插件,原理是process.dlopen打开c++插件(基本不用)
// any(其他任何类型) => 默认调用js解析器,如果内部存在js代码,可以解析

const log = require('@junc-cli/log')
const semver = require('semver')
const colors = require('colors')

const pkg = require('../package.json')
const constant = require('./const')

function core() {
   try {
       checkPkyVersion()
       checkNodeVersion()
       checkRoot()
   }catch (e){
       console.log(e.message);
   }
}

// 检查版本号
function checkPkyVersion() {
    log.notice('cli', pkg.version)
}

// 检查node版本
function checkNodeVersion() {
    // 1、获取当前系统版本
    const currentVersion = process.version
    const lowestVersion = constant.LOWEST_NODE_VERSION
    // 2、比对最低版本
    if(!semver.gte(currentVersion,lowestVersion)){
        throw new Error(colors.red(`junc-cli 需要安装 v${lowestVersion} 以上版本的 Node.js`))
    }
}

// 检查root版本
function checkRoot() {
    console.log(process);
    console.log(process.geteuid());
}