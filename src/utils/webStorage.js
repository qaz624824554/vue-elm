// 获取localstorage
export const getStorage = key => {
  return window.localStorage.getItem(key)
}

// 设置localstorage
export const setStorage = (key, content) => {
  if (!key) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(key, content)
}

// 清除所有localstorage
export const clearStorage = () => {
  window.localStorage.clear()
}
