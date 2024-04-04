import { Fighter } from "../fighter" // Adjust the path as necessary

class SS3 extends Fighter {
  constructor(name, src, x, y, speed) {
    super(name, src, x, y, speed)
    // Define SS3-specific frames using object literals
    this.frames = {
      "forwards-1": [143, 524, 40, 50],
      "forwards-2": [125, 1417, 40, 50],
      "forwards-3": [64, 1417, 48, 49],
      "forwards-4": [125, 1417, 40, 50],
      "forwards-5": [173, 1416, 44, 51],
      "forwards-6": [225, 1406, 64, 61],

      "forwards-8": [347, 1377, 370, 133],

      // Add additional frame definitions as needed
    }
    this.currentFrame = "forwards-1" // Set the initial animation frame
    this.frameKeys = Object.keys(this.frames) // Keys of the frames for cycling
    this.frameIndex = 0 // Current index in the frameKeys array
    this.animationCounter = 0 // Counter to control animation speed
    this.animationSpeed = 14 // Adjust this to control frame switch speed
    this.originalPosition = { x: x, y: y }
  }

  cycleFrames() {
    this.animationCounter++
    if (this.animationCounter >= this.animationSpeed) {
      // Determine the next frame before changing the currentFrame
      const nextFrameIndex = (this.frameIndex + 1) % this.frameKeys.length
      const nextFrame = this.frameKeys[nextFrameIndex]

      // Check if we're entering or leaving frame 7 or 8
      if (nextFrame === "forwards-6") {
        // Adjustments specific to entering frame 7
        this.position.x -= 10 // Example adjustment, change as needed
        this.position.y -= 10 // Dramatically moves character down
      } else if (nextFrame === "forwards-8") {
        // Adjustments specific to entering frame 8
        this.position.x += 10 // Moves character to the right
        this.position.y -= 35 // Moves character up
      } else if (
        this.currentFrame === "forwards-7" ||
        this.currentFrame === "forwards-8"
      ) {
        // Revert to original position if leaving frame 7 or 8
        this.position = { ...this.originalPosition }
      }

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
