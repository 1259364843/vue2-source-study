
import {observe} from './observe/index.js';

export function initState(vm) {
  const opts = vm.$options
  // data
  if(opts.data) {
    initData(vm)
  }
  // props....
}
// 初始化data
export function initData(vm) {
  let data = vm.$options.data
  data = typeof data === 'function' ? data.call(vm) : data;
  // vue2对数据进行劫持
  vm._data = data;
  observe(data)

  // 将vm._data用vm代理
  for (const key in data) {
    proxy(vm, key, '_data')
  }
}

// 将vm.xxx  代理到vm._data.xxx
function proxy(vm, key, target) {
  Object.defineProperty(vm, key, {
    // 从vm取值时,实际从vm._data上取值
    get() {
      return vm[target][key]
    },
    set(newVaule) {
      vm[target][key] = newVaule
    }
  })
}