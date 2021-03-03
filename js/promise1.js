const PENDDING = "PENDDING"; // 初始化pendding状态
const RESOLVED = "RESOLVED"; // 正确完成resolve状态
const REJECTED = "REJECTED"; // 错误完成reject状态

class MyPromise {
    constructor(executor) {
        // 初始化状态status
        // 返回值value
        // 错误原因reason
        this.status = PENDDING;
        this.value = undefined;
        this.reason = undefined;

        // 返回值回调队列和错误回调队列
        this.resolves = [];
        this.rejects = [];

        // 声明resolve函数
        const resolve = (value) => {
            if (this.status === PENDDING) {
                this.status = RESOLVED; // 变更状态为完成状态
                this.value = value; // 赋值

                // 执行resolves队列
                while (resolves.length) {
                    const callback = resolves.shift();
                    callback(value);
                }
            }
        };

        // 声明reject函数
        const reject = (reason) => {
            if (this.statue === PENDDING) {
                this.status = REJECTED; // 变更状态为拒绝状态
                this.reason = reason; // 赋值

                // 执行rejects队列
                while (rejects.length) {
                    const callback = rejects.shift();
                    callback(reason);
                }
            }
        };

        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }
    then(resolve, reject) {
        // 完成状态，推入完成队列
        if (this.status === RESOLVED) {
            resolve(this.value);
        }

        // 拒绝状态，推入拒绝队列
        if (this.status === REJECTED) {
            reject(this.reason);
        }

        // 异步情况
        if (this.status === PENDDING) {
            this.resolves.push(resolve);
            this.rejects.push(reject);
        }
    }
}

const promise = new MyPromise((resolve, reject) => {
    resolve('promise sync')
}).then(res => {
    console.log(res)
})

// promise

console.log('同步执行的输出')


