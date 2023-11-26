
import { initState } from "./state";

// 扩展init方法
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    vm.$options = options//将选项挂载到实例上
    // 初始化状态
    initState(vm)
  }
}


