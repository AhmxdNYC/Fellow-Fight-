import { Fighter } from "../constants/fighter" // Adjust the path as correct
import { FighterDirection } from "../fighterDirection"

class REDVEGETA extends Fighter {
  constructor(name, src, x, y, speed) {
    super(name, src, x, y, speed, FighterDirection.LEFT) // Starts facing right
    this.frames = {
      "forwards-1": [150, 191, 31, 48],
      // "forwards-2": [48, 254, 26, 37],
      "forwards-2": [94, 200, 29, 35],
      "forwards-3": [129, 208, 60, 26],
      "forwards-4": [201, 206, 39, 23],
      "forwards-5": [244, 208, 40, 19],
      "forwards-6": [346, 198, 26, 35],
    }
    this.currentFrame = "forwards-1"
    this.frameKeys = Object.keys(this.frames)
    this.frameIndex = 0
    this.animationCounter = 0
    this.animationSpeed = 50
  }

  cycleFrames() {
    this.animationCounter++
    if (this.animationCounter >= this.animationSpeed) {
      this.frameIndex = (this.frameIndex + 1) % this.frameKeys.length
      this.currentFrame = this.frameKeys[this.frameIndex]
      this.animationCounter = 0
    }
  }

  update(canvasWidth) {
    super.update(canvasWidth) // Calls the base class update
    this.cycleFrames() // Update to cycle through frames
  }
}

export const useREDVEGETACharacter = (canvasRef) => {
  const redVegeta = new REDVEGETA(
    "REDVEGETA",
    "./Characters/REDVEGETASprite.png",
    0,
    200,
    6
  ) // Updated name and sprite path
  const drawCharacter = (ctx, canvasWidth) => {
    redVegeta.update(canvasWidth)
    redVegeta.draw(ctx)
  }

  return { drawCharacter }
}
