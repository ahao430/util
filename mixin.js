const pageMixin = require('../mixins/page').default
const componentMixin = require('../mixins/component').default

// 合并mixins属性到Page的options中
function merge (mixin, options, properties) {
  if (Object.prototype.toString.call(mixin).slice(8, -1) === 'Object') {
    for (let [key, value] of Object.entries(mixin)) {
      if (key === 'data') {
        options.data = { ...value, ...options.data}
      } else if (key === 'methods') {
        options.methods = { ...value, ...options.methods}
      } else if (properties.includes(key)) {
        let native = options[key]
        options[key] = function (...args) {
          value.call(this, ...args)
          return native && native.call(this, ...args)
        }
      } else {
        if (options[key] == null) {
          options[key] = value
        }
      }
    }
  }
}

// 原生Component属性
const componentProperties = ['data', 'methods']

const initComponent = (nativeComponent) => {
  return (option) => {

    merge(componentMixin, option, componentProperties)
    return nativeComponent(option)
  }
}

// 原生Page属性
const pageProperties = ['data', 'onLoad', 'onReady', 'onShow', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onShareAppMessage', 'onPageScroll', 'onTabItemTap']

const initPage = (nativePage) => {
  return (option) => {
    
    merge(pageMixin, option, pageProperties)
    return nativePage(option)
  }
}

/* eslint-disable no-global-assign */
export const init = () => {
  Page = initPage(Page)
  Component = initComponent(Component)
}
