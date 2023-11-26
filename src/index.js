import { initMixin } from "./init";

function Vue(options) {
  this._init(options)
}

initMixin(Vue)//扩展init方法

export default Vue