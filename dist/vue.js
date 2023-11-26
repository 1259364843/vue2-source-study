(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  function observe(data) {
    // 对object劫持
    if (_typeof(data) !== 'object' || data == null) {
      return; //只对对象劫持
    }
    // 判断对象是否背劫持过,被劫持过的数据不需要再劫持,增添一个实例判断
    return new Observer(data);
  }
  var Observer = /*#__PURE__*/function () {
    function Observer(data) {
      _classCallCheck(this, Observer);
      // Object.defineProperty只能劫持已存在的属性,vue2里会单独写一些api,$set $delete
      // 遍历对象
      this.walk(data);
    }
    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        // 循环对象,对属性依次劫持
        // 重新定义属性
        Object.keys(data).forEach(function (key) {
          return defineReactive(data, key, data[key]);
        });
      }
    }]);
    return Observer;
  }(); // 重新定义为响应式数据;闭包;属性劫持
  function defineReactive(target, key, value) {
    // 对所有的对象哦度进行属性劫持
    observe(value);
    Object.defineProperty(target, key, {
      // 取值时执行
      get: function get() {
        console.log('get');
        return value;
      },
      // 赋值时执行
      set: function set(newValue) {
        console.log('set');
        if (newValue === value) return;
        value = newValue;
      }
    });
  }

  function initState(vm) {
    var opts = vm.$options;
    // data
    if (opts.data) {
      initData(vm);
    }
    // props....
  }
  // 初始化data
  function initData(vm) {
    var data = vm.$options.data;
    data = typeof data === 'function' ? data.call(vm) : data;
    // vue2对数据进行劫持
    vm._data = data;
    observe(data);

    // 将vm._data用vm代理
    for (var key in data) {
      proxy(vm, key, '_data');
    }
  }

  // 将vm.xxx  代理到vm._data.xxx
  function proxy(vm, key, target) {
    Object.defineProperty(vm, key, {
      // 从vm取值时,实际从vm._data上取值
      get: function get() {
        return vm[target][key];
      },
      set: function set(newVaule) {
        vm[target][key] = newVaule;
      }
    });
  }

  // 扩展init方法
  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options; //将选项挂载到实例上
      // 初始化状态
      initState(vm);
    };
  }

  function Vue(options) {
    this._init(options);
  }
  initMixin(Vue); //扩展init方法

  return Vue;

}));
//# sourceMappingURL=vue.js.map
