import { FighterDirection, FighterState } from "../fighterDirection"

export class Fighter {
  constructor(name, src, x, y, speed, direction) {
    this.name = name
    this.image = new Image()
    this.loaded = false
    this.image.onload = () => {
      this.loaded = true
      console.log(
        `${this.name} image loaded, width: ${this.image.width}, height: ${this.image.height}`
      )
      this.changeState(
        direction === FighterDirection.RIGHT
          ? FighterState.WALK_FORWARDS
          : FighterState.WALK_BACKWARDS
      )
    }
    this.image.onerror = () => {
      console.error(`Failed to load image at ${src}`)
    }
    this.image.src = src
    this.position = { x, y }
    this.speed = speed
    this.direction = direction
    this.frames = { default: [0, 0, 50, 50] }
    this.currentFrame = "default"
    this.states = {
      [FighterState.WALK_FORWARDS]: {
        init: this.handleWalkForwardInit.bind(this),
        update: this.handleWalkForwardState.bind(this),
      },
      [FighterState.WALK_BACKWARDS]: {
        init: this.handleWalkBackwardInit.bind(this),
        update: this.handleWalkBackwardState.bind(this),
      },
    }
    this.changeState(FighterState.WALK_BACKWARDS)
  }

  changeState(newState) {
    if (!this.states[newState]) {
      console.error("Invalid state:", newState)
      return
    }
    this.currentState = newState
    this.states[this.currentState].init()
  }

  handleWalkForwardInit() {
    console.log(`${this.name} is walking forwards`)
    this.speed = Math.abs(this.speed) // Ensure positive speed
  }

  handleWalkForwardState(time, context) {
    console.log(`${this.name} updating forward state at time ${time}`)
  }

  handleWalkBackwardInit() {
    console.log(`${this.name} is walking backwards`)
    this.speed = -Math.abs(this.speed) // Ensure negative speed
  }

  handleWalkBackwardState(time, context) {
    console.log(`${this.name} updating backward state at time ${time}`)
  }

  updateStageConstraints(canvasWidth) {
    const frameWidth = this.frames[this.currentFrame][2]

    if (this.position.x <= 0) {
      this.position.x = 0
      this.direction = FighterDirection.RIGHT // Change direction
      this.changeState(FighterState.WALK_FORWARDS)
    } else if (this.position.x + frameWidth >= canvasWidth) {
      this.position.x = canvasWidth - frameWidth
      this.direction = FighterDirection.LEFT // Change direction
      this.changeState(FighterState.WALK_BACKWARDS)
    }
  }

  update(canvasWidth, time, context) {
    if (!this.loaded || !this.currentState) {
      console.log("Waiting for image load and state initialization")
      return
    }

    this.position.x += this.speed
    this.updateStageConstraints(canvasWidth)
    this.states[this.currentState].update(time, context)
  }

  draw(context) {
    if (!this.loaded) {
      console.log("Image not yet loaded")
      return
    }

    const frame = this.frames[this.currentFrame]
    let [srcX, srcY, srcWidth, srcHeight] = Array.isArray(frame)
      ? frame
      : [0, 0, this.image.width, this.image.height]

    context.save()
    // The position needs to be recalculated differently when flipping horizontally
    let posX = this.position.x
    if (this.direction === FighterDirection.LEFT) {
      context.scale(-1, 1) // Flip horizontally
      posX = -posX - srcWidth // Adjust position when flipped
    } else {
      context.scale(1, 1) // Normal scale for right direction
    }

    context.drawImage(
      this.image,
      srcX,
      srcY,
      srcWidth,
      srcHeight,
      posX,
      this.position.y + 300,
      srcWidth,
      srcHeight
    )

    console.log(
      `Drawing ${this.name} at posX: ${posX}, posY: ${this.position.y}, direction: ${this.direction}`
    )

    context.restore()
  }
}
