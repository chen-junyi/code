// 多参数柯里化

const curry = fn => {
    return function curriedFn(...args) {
        if (args.length < fn.length) {
            return function() {
                return curriedFn(...args.concat([...arguments]))
            }
        }
        return fn(...args)
    }
}

const fn = (x, y, z, a) => x+y+z+a

const myFn = curry(fn)

console.log(myFn(1)(2)(3)(4))


function a (...args) {
    console.log(args)
    console.log(arguments)
}

a(1,2,3,4)