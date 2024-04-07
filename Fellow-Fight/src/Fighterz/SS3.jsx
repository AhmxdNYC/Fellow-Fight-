import { Fighter } from "../constants/fighter" // Adjust the path as correct
import { FighterDirection } from "../fighterDirection"
class SS3 extends Fighter {
  constructor(name, src, x, y, speed) {
    super(name, src, x, y, speed, FighterDirection.RIGHT) // Default direction
    this.frames = {
      "forwards-1": [143, 524, 40, 50],
      "forwards-2": [177, 603, 36, 43],
      "forwards-3": [220, 609, 65, 37],
      "forwards-4": [300, 610, 55, 29],
      "forwards-5": [360, 614, 52, 22],
      "forwards-6": [442, 601, 36, 44],
    }
    this.currentFrame = "forwards-1"
    this.frameKeys = Object.keys(this.frames)
    this.frameIndex = 0
    this.animationCounter = 0
    this.animationSpeed = 50
    // 18 normal
  }
  //testing ing again nnklnmlksfsfsfsf test ishshhsfsfs big test 4 676899 final test2
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
    this.cycleFrames()
  }
}

export const useSS3Character = (canvasRef) => {
  const ss3 = new SS3("SS3", "/Characters/SS3Sprite.png", 0, 0, 6)
  // speed 4
  const drawCharacter = (ctx, canvasWidth) => {
    ss3.update(canvasWidth)
    ss3.draw(ctx)
  }

  return { drawCharacter }
}
