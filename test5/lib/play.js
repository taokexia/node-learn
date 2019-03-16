const Player = require('player')


module.exports = (url) => {
  return new Promise((resolve, reject) => {
    const player = new Player(url)
    player.play()

    player.on('playing',function(item) {
      console.log('播放中')
      resolve(player)
    }) 

    play.on('error', function(err) {
      console.log('播放出错')
      reject(err)
    })
  })
}