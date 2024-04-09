import { FighterDirection, FighterState } from "../fighterDirection"

export class Fighter {
  constructor(name, src, x, y, speed, direction, canvasWidth) {
    // Added canvasWidth to constructor
    this.name = name
    this.image = new Image()
    this.loaded = false
    this.image.onload = () => {
      this.loaded = true
      console.log(
        console.log(
          `Initial position set to x: ${this.position.x}, y: ${this.position.y} with canvasWidth: ${canvasWidth}`
        )
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

    this.position = {
      x: direction === FighterDirection.RIGHT ? x : x + canvasWidth - 50, // Use canvasWidth for offset when facing left
      y: y,
    }
    console.log(canvasWidth, 'from fighter')
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

  setDirection(newDirection) {
    console.log(`Setting direction to: ${newDirection}`);  // Debug log
    this.direction = newDirection === 'forwards' ? FighterDirection.RIGHT : FighterDirection.LEFT;
    this.changeState(newDirection === 'forwards' ? FighterState.WALK_FORWARDS : FighterState.WALK_BACKWARDS);
}

changeState(newState) {
  if (!this.states[newState]) {
    console.error("Invalid state:", newState);
    return;
  }
  this.currentState = newState;
  this.states[this.currentState].init();  // Make sure this sets up the state correctly for the update to behave as expected.
  console.log(`State changed to: ${newState}`);
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

    // If the character is moving right and exceeds the canvas boundary
    if (
      this.direction === FighterDirection.RIGHT &&
      this.position.x + frameWidth > canvasWidth
    ) {
      this.position.x = canvasWidth - frameWidth // Align character to the right edge
      this.speed = 0 // Stop moving
      console.log("Stopped at right edge")
    }

    // If the character is moving left and exceeds the canvas boundary
    if (this.direction === FighterDirection.LEFT && this.position.x < 0) {
      this.position.x = 0 // Align character to the left edge
      this.speed = 0 // Stop moving
      console.log("Stopped at left edge")
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
      console.log("Image not yet loaded");
      return;
    }

    context.save();  // Save the current state of the canvas
    let posX = this.position.x;
    let posY = this.position.y + 300;

    // Adjust drawing based on the direction
    if (this.direction === FighterDirection.LEFT) {
        context.scale(-1, 1);
        posX = -posX - this.frames[this.currentFrame][2];  // Ensure width is considered in the flip
    }

    const [srcX, srcY, srcWidth, srcHeight] = this.frames[this.currentFrame];
    context.drawImage(this.image, srcX, srcY, srcWidth, srcHeight, posX, posY, srcWidth, srcHeight);
    context.restore();  // Restore to the original state after drawing
    console.log(`Drawing ${this.name} at posX: ${posX}, posY: ${posY}, direction: ${this.direction}`);
}

}
