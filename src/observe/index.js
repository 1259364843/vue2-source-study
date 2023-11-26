

export function observe (data) {
  // 对object劫持
  if (typeof data !== 'object' || data == null) {
    return;//只对对象劫持
  }
  // 判断对象是否背劫持过,被劫持过的数据不需要再劫持,增添一个实例判断
  return new Observer(data);
}

class Observer{
  constructor(data) {
    // Object.defineProperty只能劫持已存在的属性,vue2里会单独写一些api,$set $delete
    // 遍历对象
    this.walk(data);
  }
  walk(data) {
    // 循环对象,对属性依次劫持
    // 重新定义属性
    Object.keys(data).forEach(key => defineReactive(data, key,data[key]))
  }
}

// 重新定义为响应式数据;闭包;属性劫持
export function defineReactive(target, key, value) {
  // 对所有的对象哦度进行属性劫持
  observe(value)
  Object.defineProperty(target, key, {
    // 取值时执行
    get() {
      console.log('get');
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