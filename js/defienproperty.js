var o = {
  b: 1,
}

Object.defineProperty(o, 'b', {
  get(a) {
    console.log('get', a)
    return a
  },
  set(newValue) {
    console.log('asdaqw', newValue)
  },
})

o.b = 2
console.log('after a=ob - 2')
