// 本地存储sessionStorage
class sessionStorageProxy {
  constructor(storageModel) {
    this.storage = storageModel;
  }

  // 设置
  setItem(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  // 获取
  getItem(key) {
    return JSON.parse(this.storage.getItem(key));
  }

  // 删除
  removeItem(key) {
    this.storage.removeItem(key);
  }

  // 清空
  clear() {
    this.storage.clear();
  }
}

// 本地存储localStorage
class localStorageProxy extends sessionStorageProxy {
  constructor(localStorage) {
    super(localStorage);
  }
}

export const storageSession = new sessionStorageProxy(sessionStorage);
export const storageLocal = new localStorageProxy(localStorage);
