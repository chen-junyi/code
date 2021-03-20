/*app.js*/
const Koa = require('koa')
const app = new Koa()

const fs = require('fs')
const path = require('path')

// 定义资源类型常量列表
const mimes = {
  css: 'text/css',
  less: 'text/css',
  gif: 'image/gif',
  html: 'text/html',
  ico: 'image/x-icon',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  js: 'text/javascript',
  json: 'application/json',
  pdf: 'application/pdf',
  png: 'image/png',
  svg: 'image/svg+xml',
  swf: 'application/x-shockwave-flash',
  tiff: 'image/tiff',
  txt: 'text/plain',
  wav: 'audio/x-wav',
  wma: 'audio/x-ms-wma',
  wmv: 'video/x-ms-wmv',
  xml: 'text/xml',
}

// 解析资源类型
function parseMime(url) {
  let extName = path.extname(url)
  extName = extName ? extName.slice(1) : 'unknown'
  return mimes[extName]
}

const parseStatic = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readFile(dir, 'binary', (err, data) => {
      resolve(data)
      reject(err)
    })
  })
}

app.use(async (ctx) => {
  const url = ctx.request.url
  if (url === '/') {
    ctx.body = await parseStatic('./index.html')
  } else {
    ctx.set('Content-Type', parseMime(url))
    // console.log(parseMime(url))
    ctx.body = await parseStatic('.' + url)
  }
})

app.listen(3000, () => {
  console.log('starting at port 3000')
})
