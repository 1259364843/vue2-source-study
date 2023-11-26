// 重写部分数组方法

// 1.获取数组原型
const  oldArrayProto = Array.prototype;


// 2.创建新的数组原型
const newArrayPtoto = Object.create(oldArrayProto)

// 所有的变异方法
// concat slice不会改变原数组
const methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'reverse',
  'sort',
  'splice'
]
// 重写方法
methods.forEach(method => {
  newArrayPtoto[method] = function(...args) {
    // 1.内部调用原来的方法,函数劫持
    const res = oldArrayProto[method].call(this, ...args);
    console.log('调用',method);

    // 2.对方法传的参数再次劫持
    let inserted;
    const ob = this.__ob__;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        // splice方法第三个参数为新增的数据
        inserted = args.slice(2)
      default:
        break;
    }
    
    // 2.1如果有新增的内容,再次观测
    if (inserted) {
      ob.observeArray(inserted)
    }
    return res;
  }
})
export {
  newArrayPtoto
}