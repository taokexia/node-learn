const http = require('http')
const cluster = require('cluster')
const cpus = require('os').cpus()

if(cluster.isMaster) {
  for(let i = 0; i < cpus.length; i++) {
    cluster.fork()
  }
} else {
  http.Server((req, res) => {
    for(var i = 0; i < 1000000; i++) {}
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('经过一段耗时操作，这是返回的一段文本\n')
  }).listen(5000, '127.0.0.1', () => console.log('服务器启动了'))
}