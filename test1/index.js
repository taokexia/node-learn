const rabbit = '兔子'
const turtle = '乌龟'

// 声明一坨变量，作为赛道起点终点字符串
const start = '|'
const end = '》'
const pad = '.'
const speed = 1
const steps = 50
const stopAt = 42
let stoped = false
let t = 0
let timer

// 计算兔子距离终点
const getRabbitLastSteps = () => {
  return steps - t * speed - t * speed * 3
}

// 计算乌龟距离终点
const getTurtleLastSteps = () => {
  return steps - t * speed
}

// 计算龟兔间距
const getGapSteps = () => {
  return stopAt - t * speed
}

// 初始赛道状态
const checkRaceInitState = () => {
  return `${rabbit}${turtle}${start}${pad.repeat(steps)}${end}`
}

// 兔子领先的赛道状态
const checkRaceState = () => {
  return `${start}${pad.repeat(t * speed)}${turtle}${pad.repeat(t * speed * 3)}${rabbit}${pad.repeat(getRabbitLastSteps())}${end}`
}

// 分情况计算赛道的实时状态
const checkBackRaceState = () => {
  if(getGapSteps() <= 0) {
    if(getTurtleLastSteps() === 0) {
      return `${start}${pad.repeat(stopAt)}${rabbit}${pad.repeat(steps-stopAt)}${end}${turtle}`
    } else {
      return `${start}${pad.repeat(stopAt)}${rabbit}${pad.repeat(t * speed-stopAt)}${turtle}${pad.repeat(getTurtleLastSteps())}${end}`
    }
  } else {
    return `${start}${pad.repeat(t * speed)}${turtle}${pad.repeat(getGapSteps())}${rabbit}${pad.repeat(steps-stopAt)}${end}`
  }
}

// 等待时间，把定时器包装成一个 Promise
const wait = (sec) => new Promise(resolve => setTimeout(() =>  resolve(), sec))

const chalkWorker = require('chalk-animation')
const initState = checkRaceInitState()
const racing = chalkWorker.rainbow(initState)

const updateRaceTrack = (state) => {
  racing.replace(state)
}

const race = () => {
  timer = setInterval(() => {
    if(!stoped) {
      if(getRabbitLastSteps() <= (steps - stopAt)) {
        stoped = true
      }
    }

    if(stoped) {
      let state = checkBackRaceState()
      // console.log(state)
      updateRaceTrack(state)

      if(getTurtleLastSteps() === 0) {
        clearInterval(timer)
        return
      }
    } else {
      let state = checkRaceState()
      // console.log(state)
      updateRaceTrack(state)
    }

    t++
  }, 150)
}

wait(2000).then(()=> {
  race()
})