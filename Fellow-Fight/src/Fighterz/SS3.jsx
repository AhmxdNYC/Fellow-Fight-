import { Fighter } from "../fighter" // Adjust the path as correct

class SS3 extends Fighter {
  constructor(name, src, x, y, speed) {
    super(name, src, x, y, speed)
    // Define SS3-specific frames for forwards movement
    this.forwardFrames = {
      "forwards-1": [143, 524, 40, 50],
      "forwards-2": [603, 518, 36, 58],
      "forwards-3": [177, 603, 36, 43],
      "forwards-4": [220, 609, 65, 37],
      "forwards-5": [300, 610, 55, 29],
      "forwards-6": [360, 614, 52, 22],
      "forwards-7": [360, 614, 52, 22],
      "forwards-8": [442, 601, 36, 44],
    }
    // Define SS3-specific frames for backwards movement
    this.backwardFrames = {
      "backwards-1": [497, 597, 35, 49],
      "backwards-2": [497, 597, 35, 49], // Assuming these are correct for demonstrating backward movement
      "backwards-3": [497, 597, 35, 49],
      "backwards-4": [106, 593, 59, 53], // Assuming these are correct for demonstrating backward movement
      "backwards-5": [106, 593, 59, 53],
      "backwards-6": [106, 593, 59, 53],
      "backwards-7": [106, 593, 59, 53],
      "backwards-8": [106, 593, 59, 53],
      "backwards-9": [300, 610, 55, 29],
      "backwards-10": [360, 614, 52, 22],
      "backwards-11": [54, 594, 41, 52], // Assuming these are correct for demonstrating backward movement
    }
    // Initial setup
    this.frames = this.forwardFrames // Start with forward frames
    this.currentFrame = "forwards-1"
    this.frameKeys = Object.keys(this.frames) // Updated to the current frames
    this.frameIndex = 0
    this.animationCounter = 5
    this.animationSpeed = 18
    this.originalPosition = { x: x, y: y }
    this.movingForward = true // Track the direction of movement
  }
  cycleFrames() {
    this.animationCounter++
    if (this.animationCounter >= this.animationSpeed) {
      // Determine the next frame before changing the currentFrame
      const nextFrameIndex = (this.frameIndex + 1) % this.frameKeys.length
      const nextFrame = this.frameKeys[nextFrameIndex]

      // Check if we're entering or leaving frame 7 or 8
      // Update current frame and index
      this.currentFrame = nextFrame
      this.frameIndex = nextFrameIndex
      this.animationCounter = 0 // Reset the counter
    }
  }
  update(canvasWidth) {
    super.update(canvasWidth) // Call the base class update
    this.cycleFrames() // Additional call to handle frame cycling
  }

  toggleDirection() {
    this.movingForward = !this.movingForward
    this.frames = this.movingForward ? this.forwardFrames : this.backwardFrames
    this.frameKeys = Object.keys(this.frames) // Update to current direction frames
    this.currentFrame = this.frameKeys[0] // Reset to the first frame of the new direction
    this.frameIndex = 0
  }

  update(canvasWidth) {
    super.update(canvasWidth) // Call the base class update
    // Example condition to toggle direction (e.g., based on speed sign)
    if (this.speed > 0 && !this.movingForward) {
      this.toggleDirection()
    } else if (this.speed < 0 && this.movingForward) {
      this.toggleDirection()
    }
    this.cycleFrames() // Additional call to handle frame cycling
  }
}

// Custom hook remains the same
export const useSS3Character = (canvasRef) => {
  const ss3 = new SS3("SS3", "/Characters/SS3Sprite.png", 0, 0, 4)

  const drawCharacter = (ctx, canvasWidth) => {
    ss3.update(canvasWidth)
    ss3.draw(ctx)
  }

  return { drawCharacter }
}

this.forwardFrames = {
  "forwards-1": [143, 524, 40, 50],
  "forwards-2": [603, 518, 36, 58],
  "forwards-3": [177, 603, 36, 43],
  "forwards-4": [220, 609, 65, 37],
  "forwards-5": [300, 610, 55, 29],
  "forwards-6": [360, 614, 52, 22],
  "forwards-7": [360, 614, 52, 22],
  "forwards-8": [442, 601, 36, 44],
}
// Define SS3-specific frames for backwards movement
this.backwardFrames = {
  "backwards-1": [497, 597, 35, 49],
  "backwards-2": [497, 597, 35, 49], // Assuming these are correct for demonstrating backward movement
  "backwards-3": [497, 597, 35, 49],
  "backwards-4": [106, 593, 59, 53], // Assuming these are correct for demonstrating backward movement
  "backwards-5": [106, 593, 59, 53],
  "backwards-6": [106, 593, 59, 53],
  "backwards-7": [106, 593, 59, 53],
  "backwards-8": [106, 593, 59, 53],
  "backwards-9": [300, 610, 55, 29],
  "backwards-10": [360, 614, 52, 22],
  "backwards-11": [54, 594, 41, 52], // Assuming these are correct for demonstrating backward movement
}
