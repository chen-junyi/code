class Promise {
  constructor(exec) {
    this.status = 'pending'
    this.value = undefined
    this.reason = undefined

    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
    const resolve = (value) => {
      queueMicrotask(() => {
        this.value = value
        this.status = 'resolved'
        // console.log('value')
        console.log(this.onResolvedCallbacks.length, 'length')
        this.onResolvedCallbacks.forEach((callback) => callback())
      })
    }

    const reject = (reason) => {
      queueMicrotask(() => {
        this.reason = reason
        this.status = 'rejected'
        this.onRejectedCallbacks.forEach((callback) => callback())
      })
    }

    try {
      exec(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(callback) {
    return new Promise((resolve, reject) => {
      this.onResolvedCallbacks.push(() => {
        let result
        try {
          result = callback(this.value)
        } catch (error) {
          return reject(error)
        }
        if (result instanceof Promise) {
          result.then(resolve)
        } else {
          resolve(result)
        }
      })
    })
  }
}

console.log('同步执行的输出')
