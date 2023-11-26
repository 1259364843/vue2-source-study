import { newArrayPtoto } from './array'

export function observe (data) {
  // 对object劫持
  if (typeof data !== 'object' || data == null) {
    return;//只对对象劫持
  }
  // 判断对象是否被劫持过,被劫持过的数据不需要再劫持,增添一个实例判断
  return new Observer(data);
}

class Observer{
  constructor(data) {
    // 不可枚举
    Object.defineProperty(data, '__ob__', {
      value: this,
      enumerable: false
    })
    // data.__ob__ = this;
    // Object.defineProperty只能劫持已存在的属性,vue2里会单独写一些api,$set $delete
    // 遍历对象
    if (Array.isArray(data)) {
      // 重写数组的7个变异方法,保留数组原特性
      data.__proto__ = newArrayPtoto
      // 如果数组元素是对象, 数组中的属性也劫持
      this.observeArray(data)
    } else {
      this.walk(data);
    }
    
  }
  walk(data) {
    // 循环对象,对属性依次劫持
    // 重新定义属性
    Object.keys(data).forEach(key => defineReactive(data, key,data[key]))
  }
  observeArray(data) {
    // 数组的每一项属性都进行观测
    data.forEach(item => observe(item))
  }
}

// 重新定义为响应式数据;闭包;属性劫持
export function defineReactive(target, key, value) {
  // 对所有的对象哦度进行属性劫持
  observe(value)
  Object.defineProperty(target, key, {
    // 取值时执行
    get() {
      console.log('get', value);
      return value;
    },
    // 赋值时执行
    set(newValue) {
      console.log('set');
      if (newValue === value) return;
      value = newValue;
    }
  })
}