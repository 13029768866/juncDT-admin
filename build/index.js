// 处理环境变量
const wrapperEnv = (envConf) => {
  // 此处为默认值，无需修改
  const ret = {
    VITE_PORT: '',
    VITE_PUBLIC_PATH: '',
    VITE_PROXY_DOMAIN: '',
    VITE_PROXY_DOMAIN_REAL: '',
    VITE_ROUTER_HISTORY: '',
    VITE_LEGACY: false,
  };

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;

    if (envName === 'VITE_PORT') {
      realName = Number(realName);
    }
    ret[envName] = realName;
    if (typeof realName === 'string') {
      process.env[envName] = realName;
    } else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName);
    }
  }
  return ret;
};

// 跨域代理重写
const regExps = (value, reg) => {
  return value.replace(new RegExp(reg, 'g'), '');
};
export { wrapperEnv, regExps };
