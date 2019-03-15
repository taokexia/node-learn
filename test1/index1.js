const chalkWorker = require('chalk-animation')

class Race extends Object {
  constructor() {
    super()
    this.turtle = "乌龟"
    this.rabbit = "兔子"
    this.turtleStatus = 0
    this.rabbitStatus = 0
    this.start = '|'
    this.pad = '.'
    this.end = '》'
    this.rabbitStop = 42
    this.speed = 1
    this.steps = 50
  }
  getRaceTrack() {
    const {
      start,
      pad,
      end,
      turtle,
      turtleStatus,
      rabbit,
      rabbitStatus,
      steps,
      speed
    } = this
    if(!turtleStatus && !rabbitStatus) {
      return `${rabbit}${turtle}${start}${pad.repeat(steps)}${end}`
    }
    const [
      [minStr, min],
      [maxStr, max]
    ] = [
      [turtle, turtleStatus],
      [rabbit, rabbitStatus]
    ].sort((a, b) => a[1] - b[1])

    const prefix = `${pad.repeat((min || 1) - 1)}`
    const middle = `${pad.repeat(max-min)}`
    const suffix = `${pad.repeat(steps- max)}`

    const _start = `${start}${prefix}${minStr}`
    const _end = suffix ? `${maxStr}${suffix}${end}` : `${end}${maxStr}`
    return `${_start}${middle}${_end}`
  }
  updateRaceTrack(state, racing) {
    racing.replace(state)
  }
  updateSteps() {
    if(this.turtleStatus >= this.steps) return
    if(this.rabbitStatus <= this.rabbitStop) {
      this.rabbitStatus += 3 * this.speed
    }
    this.turtleStatus += 1* this.speed
  }
  race() {
    const initState = this.getRaceTrack()
    const racing = chalkWorker.rainbow(initState)
    let t = 0
    let timer = setInterval(() => {
      if(t <= 6) {
        t += 1
        return
      }
      const state = this.getRaceTrack()
      this.updateRaceTrack(state, racing)
      this.updateSteps()
    }, 150)
  }
}

const proxy = new Proxy(Race, {
  apply(target, ctx, args) {
    const race = new Race(...args)
    return race.race()
  }
})

proxy()