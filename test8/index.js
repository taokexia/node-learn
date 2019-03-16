const https = require('https')

const url = 'https://nodejs.org/dist/index.json'

https.get(url, (res) => {
  let data = ''

  res.on('data', (chunk) => {
    data += chunk
  })

  res.on('end', () => {
    console.log(data.toString())
  })
}).on('error', (e) => {
  console.log(e)
})