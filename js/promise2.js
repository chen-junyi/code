// 依据规范生成初始版本
class NewPromise {
  constructor(executor) {
    // 存在三种状态
    this.enumStatus = {
      PADDING: 'padding',
      FULFILLED: 'fulfilled',
      REJECTED: 'rejected',
    }
    // 初始态为等待态
    this.state = this.enumStatus.PADDING
    // 必须存在一个终值
    this.value = ''
    // 必须存在一个被拒绝的原因
    this.reason = ''
    // 任务中心
    this.onFulfilledQueue = []
    this.onRejectedQueue = []
    // 转化执行态
    let resolve = (value) => {
      // 修改状态
      this.state = this.enumStatus.FULFILLED
      // 必须有一个终值
      this.value = value
      // 当服务器数据返回时，依次执行预存的成功事务
      this.onFulfilledQueue.map((fn) => fn(this.value))
    }
    // 转化失败态
    let reject = (reason) => {
      // 修改状态
      this.state = this.enumStatus.REJECTED
      // 如果是失败态，必须有一个据因
      this.reason = reason
      // 当服务器数据返回时，依次执行预存的失败事务
      this.onRejectedQueue.map((fn) => fn(this.reason))
    }
    // 如果executor执行报错，直接执行reject
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
  // 必须包含then方法
  then(onFulfilled, onRejected) {
    // 保证onFulfilled和onRejected都是函数类型
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (err) => {
            Throw(err)
          }
    let promise2 = new NewPromise((resolve, reject) => {
      // 如果onFulfilled是函数类型，且状态为执行态，则执行该函数，将终值作为该函数的参数，否则忽略其
      if (this.state === this.enumStatus.FULFILLED) {
        setTimeout(() => {
          resolvePromise(promise2, onFulfilled(this.value), resolve, reject)
        }, 0)
      }
      // 如果onRejected是函数类型，且状态为拒绝态，则执行该函数，将据因作为该函数的参数，否则忽略其
      if (this.state === this.enumStatus.REJECTED) {
        setTimeout(() => {
          resolvePromise(promise2, onRejected(this.reason), resolve, reject)
        }, 0)
      }
      // 如果当前状态为等待态，则将其加入事务
      if (this.state === this.enumStatus.PADDING) {
        this.onFulfilledQueue.push(() => {
          resolvePromise(promise2, onFulfilled(this.value), resolve, reject)
        })
        this.onRejectedQueue.push(() => {
          resolvePromise(promise2, onRejected(this.reason), resolve, reject)
        })
      }
    })
    return promise2
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  // 防止循环调用
  if (promise2 === x) {
    reject(Throw('不允许循环调用'))
  }
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    //函数或对象
    let then = x.then
    if (typeof then === 'function') {
      // 如果函数运行后的返回值仍然是一个promise，则递归调用resolvePromise
      then.call(
        x,
        (res) => resolvePromise(promise2, res, resolve, reject),
        (err) => reject(err)
      )
    } else {
      resolve(x)
    }
  } else {
    //普通值
    resolve(x)
  }
}

// 调用
var p1 = new NewPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('前端橘子君')
  }, 1000)
})

var p2 = new NewPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('我是链式调用的结果')
  }, 3000)
})

p1.then((data) => {
  console.log(data)
  return p2
}).then((data) => {
  console.log(data)
})
