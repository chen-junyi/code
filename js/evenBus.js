// eventBus原理
export default class Bus {
  constructor() {
    this.callbacks = {}
  }
  $on(event, fn) {
    this.callbacks[event] = this.callbacks[event] || []
    this.callbacks[event].push(fn)
  }
  $emit(event, args) {
    this.callbacks[event] &&
      this.callbacks[event].forEach((fn) => {
        fn(args)
      })
  }
  $off(event) {
    Reflect.deleteProperty(this.callbacks[event])
  }
}

// 在main.js中引入以下
// Vue.prototype.$bus = new Bus()
