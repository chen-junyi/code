Function.prototype.call = function (context) {
  // 如果有context参数，将context转换成对象 否则就是window
  context = context ? Object(context) : window
  // 给context.fn赋值为this，也就是当前要执行的函数
  context.fn = this
  // 获取函数执行的参数，从1开始，0是context
  let args = []
  for (let i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']')
  }
  // 字符串拼接数组，数组会调用toString方法，实现将数组参数一个个传进去，最后用eval执行拼接后的函数字符串
  let res = eval('context.fn(' + args + ')')
  delete context.fn
  return res
}
