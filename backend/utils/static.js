const path = require('path')
const fs = require('fs')

let mimes = {
    'json': 'application/json',
    'pdf': 'application/pdf',
    'swf': 'application/x-shockwave-flash',
    'xls': 'application/msexcel',
    'xlsx': 'application/msexcel',
    'ppt': 'application/mspowerpoint',
    'doc': 'application/msword',
    'exe': 'application/octet-stream',
    'zip': 'application/zip',
    'txt': 'text/plain',
    'css': 'text/css',
    'less': 'text/css',
    'html': 'text/html',
    'xml': 'text/xml',
    'js': 'text/javascript',
    'gif': 'image/gif',
    'ico': 'image/x-icon',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'svg': 'image/svg+xml',
    'tiff': 'image/tiff',
    'wav': 'audio/x-wav',
    'wma': 'audio/x-ms-wma',
    'mp3': 'audio/mpeg',
    'wmv': 'video/x-ms-wmv',
    'mp4': 'video/mp4',
    'ogv': 'video/ogg',
    'flv': 'video/x-flv',
    'avi': 'video/x-msvideo',
    'rmvb': 'application/vnd.rn-realmedia',
    'rm': 'application/vnd.rn-realmedia'
}
const imageTypes = ['gif', 'ico', 'jpg', 'jpeg', 'png', 'svg']
const audioTypes = ['mp3', 'wav', 'wma']
const videoTypes = ['wmv', 'mp4', 'ogv', 'flv', 'avi', 'rmvb', 'rm']
const fileTypes = ['json', 'pdf', 'swf', 'xls', 'xlsx', 'ppt', 'doc', 'exe', 'txt', 'zip']
/**
 * 遍历读取目录内容（子目录，文件名）
 * @param  {string} reqPath 请求资源的绝对路径
 * @return {array} 目录内容列表
 */
function walk (reqPath) {
  let files = fs.readdirSync(reqPath)
  let dirList = []
  let fileList = []
  for (let i = 0, len = files.length; i < len; i++) {
    let item = files[i]
    let itemArr = item.split('.')
    //console.log(itemArr)
    let itemMime = (itemArr.length > 1) ? itemArr[ itemArr.length - 1 ] : 'undefined'
    //console.log(itemMime)
    //0-图片，1-文件，2-文件夹，3-音频，4-视频，5-其他
    if (typeof mimes[ itemMime ] === 'undefined') {
      dirList.push({ name: files[i], type: 2 })
    } else if(imageTypes.indexOf(itemMime) !== -1) {
      fileList.push({ name: files[i], type: 0 })
    } else if(fileTypes.indexOf(itemMime) !== -1) {
      fileList.push({ name: files[i], type: 1 })
    } else if(audioTypes.indexOf(itemMime) !== -1) {
      fileList.push({ name: files[i], type: 3 })
    } else if(videoTypes.indexOf(itemMime) !== -1) {
      fileList.push({ name: files[i], type: 4 })
    } else {
      fileList.push({ name: files[i], type: 5 })
    }
  }
  // console.log(dirList)
  // console.log(fileList)

  let result = dirList.concat(fileList)

  return result
}

/**
 * 封装目录内容
 * @param  {string} url 当前请求的上下文中的url，即ctx.url
 * @param  {string} reqPath 请求静态资源的完整本地路径
 * @return {string} 返回目录内容，封装成HTML
 */
function dir (url, reqPath) {
// 遍历读取当前目录下的文件、子目录
  let contentList = walk(reqPath)
  let list = []
  let addr = url === '/' ? '' : url
  for(let [ index, item ] of contentList.entries()) {
    list.push({name: item.name, type: item.type, link: addr+'/'+item.name})
  }
  //console.log(list)
  return list
}

/**
 * 读取文件方法
 * @param  {string} 文件本地的绝对路径
 * @return {string|binary}
 */
function file (filePath) {
  let content = fs.readFileSync(filePath, 'binary')
  return content
}

/**
 * 获取静态资源内容
 * @param  {object} ctx koa上下文
 * @param  {string} 静态资源目录在本地的绝对路径
 * @return  {string} 请求获取到的本地内容
 */
async function content (ctx, fullStaticPath) {
  // 封装请求资源的完绝对径
  let reqPath
  if(!ctx.params.directory) {
    reqPath = path.join(fullStaticPath, ctx.url)
  } else {
    reqPath = path.join(fullStaticPath, '/public/'+ctx.params.directory)
  }

  // 判断请求路径是否为存在目录或者文件
  let exist = fs.existsSync(reqPath)

  // 返回请求内容， 默认为空
  let content = ''

  if (!exist) {
    // 如果请求路径不存在，返回404
    content = '请求路径不存在！'+reqPath
  } else {
    // 判断访问地址是文件夹还是文件
    let stat = fs.statSync(reqPath)
    //console.log(stat)
    if (stat.isDirectory()) {
      // 如果为目录，则渲读取目录内容
      if(!ctx.params.directory) {
        content = dir(ctx.url, reqPath)
      } else {
        content = dir('/public/'+ctx.params.directory, reqPath)
      }
    } else {
      // 如果请求为文件，则读取文件内容
      content = await file(reqPath)
    }
  }

  //console.log(content)

  return content
}

// 解析资源类型
function parseMime (url) {
  let extName = path.extname(url)
  extName = extName ? extName.slice(1) : 'unknown'
  return mimes[ extName ]
}

module.exports = {
  parseMime: parseMime,
  content: content
}

