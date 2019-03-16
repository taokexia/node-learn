const fs = require('fs')
const http = require('http')
const request = require('request')
const child_process = require('child_process')
const EventEmitter = require('evnets').EventEmitter

const spawn = child_process.spawn
const mp3Args = ['-i', 'pipe:0', '-f', 'mp3', '-ac', '2', '-ab', '128k', '-acodec', 'libmp3lame', 'pipe:1']
const mp4Args = ['-i', 'pipe:0', '-c', 'copy', '-bsf:a', 'aac_adtstoasc', 'pipe:1']

class VideoTool extends EventEmitter {
  constructor(url, filename) {
    super()
    this.url = url
    this.filename = filename
  }

  mp3() {
    this.ffmpeg = spawn('ffmpeg', mp3Args)

    http.get(this.url, (res) => {
      res.pipe(this.ffmpeg.stdin)
    })

    this.ffmpeg.stdout.pipe(fs.createWriteStream(this.filename))
    this.ffmpeg.on('exit', () => {
      console.log('Finished:', this.filename)
    })
  }

  mp4() {
    let stream = fs.createWriteStream(this.filename)
    request.get(this.url, {
      headers: {
        'Content-Type': 'video/mpeg4',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Salari/537.36'
      }
    })
    .pipe(stream)
    .on('open', () => {
      console.log('start download')
    })
    .on('close', () => {
      console.log('download finished')
    })
  }
}

const video = 'http://vt1.doubanio.com/201810291353/4d7bcf6af730df6d9b4da321aa6d7faa/view/movie/M402380210.mp4'
const m1 = new VideoTool(video, 'audio.mp3')
const m2 = new VideoTool(video, __dirname + '/video.mp4')

m1.mp3()
m2.mp4()