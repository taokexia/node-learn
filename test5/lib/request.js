const https = require('https')

module.exports = (url) => new Promise((resolve, reject) => {
  https.get(url, (req, res) => {
    let data = []

    req.on('data', chunk => {
      data.push(chunk)
    })
    req.on('end', ()=> {
      let body

      try {
        body = JSON.parse(data.join(''))
      } catch(err) {
        console.log('<== API 服务可能挂了, 稍后重试! ==>')
      }

      resolve(body)
    })
  })
})