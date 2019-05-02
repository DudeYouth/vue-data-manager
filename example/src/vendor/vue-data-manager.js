import Vue from 'vue'

function isObject (data) {
  return Object.prototype.toString.call(data) === '[object Object]'
}

export default class Store {
  constructor (data) {
    this.init(data)
  }
  init (data) {
    if (!isObject(data)) {
      throw new Error('Store class params is not object!')
    }
    for (let key in data) {
      let item = data[key]
      let obData = {}
      if (typeof item.data === 'function') {
        obData = item.data()
        if (!isObject(obData)) {
          throw new Error('vue store ' + key + '.data is not return object!')
        }
      } else if (!isObject(item.data)) {
        throw new Error('vue store ' + key + '.data must is object or function!')
      }
      if (item.watch && !isObject(item.watch)) {
        throw new Error('vue store ' + key + '.watch must is object!')
      }
      if (item.computed && !isObject(item.computed)) {
        throw new Error('vue store ' + key + '.computed must is object!')
      }
      if (item.methods && !isObject(item.methods)) {
        throw new Error('vue store ' + key + '.methods must is object!')
      }
      for (let computedPropsKey in item.computed) {
        let computedMethod = item.computed[computedPropsKey]
        let result = computedMethod.call(obData)
        if (typeof result === 'function') {
          throw new Error('vue store ' + key + '.computed.' + computedPropsKey + ' return is not a legal value!')
        }
        obData[computedPropsKey] = result
      }
      let state = this[key] = Vue.observable(obData)
      state.$watch = Vue.prototype.$watch.bind(state)
      state.$nextTick = Vue.nextTick.bind(state)
      state.$delete = Vue.delete.bind(state)
      state._watchers = []
      if (item.watch) {
        for (let watchKey in item.watch) {
          Vue.prototype.$watch.call(state, watchKey, function (...args) {
            item.watch[watchKey].call(state, ...args)
          })
        }
      }
      if (item.computed) {
        for (let computedPropsKey in item.computed) {
          let computedMethod = item.computed[computedPropsKey]
          Vue.prototype.$watch.call(state, computedMethod.bind(state), function (value) {
            state[computedPropsKey] = value
          })
        }
      }
      for (let methodName in item.methods) {
        let method = item.methods[methodName]
        if (typeof method !== 'function') {
          throw new Error('vue store ' + key + '.methods.' + methodName + ' is not funtion!')
        }
        state[methodName] = item.methods[methodName].bind(state)
      }
    }
  }
}
