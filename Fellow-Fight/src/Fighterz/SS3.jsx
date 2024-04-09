import { Fighter } from "../constants/fighter"
import { FighterDirection , FighterState } from "../fighterDirection"

export class SS3 extends Fighter {
  constructor(name, src, x, y, speed, canvasWidth) {
    // Add canvasWidth parameter
    super(name, src, x, y, speed, FighterDirection.RIGHT, canvasWidth) // Pass canvasWidth to the superclass constructor if necessary
    this.canvasWidth = canvasWidth // Store canvasWidth for later use, if needed

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
  }

  cycleFrames() {
    this.animationCounter++
    if (this.animationCounter >= this.animationSpeed) {
      this.frameIndex = (this.frameIndex + 1) % this.frameKeys.length
      this.currentFrame = this.frameKeys[this.frameIndex]
      this.animationCounter = 0
    }
  }

  setDirection(newDirection) {
  console.log(`Changing direction to: ${newDirection} from ss3`);  // Debug log
  if (newDirection === 'forwards') {
      this.direction = FighterDirection.RIGHT;
      this.changeState(FighterState.WALK_FORWARDS);
  } else if (newDirection === 'backwards') {
      this.direction = FighterDirection.LEFT;
      this.changeState(FighterState.WALK_BACKWARDS);
  }
  this.currentDirection = newDirection;
  this.frameKeys = Object.keys(this.frames[this.currentDirection]);
  this.frameIndex = 0; // Reset frame index when changing direction
}
  

  update(canvasWidth,context,time) {
    super.update(canvasWidth, time, context); // Call to the superclass update
    this.cycleFrames(); // Continue to cycle through frames
  }
}
export const useSS3Character = (canvasRef, canvasWidth) => { // Assume canvasWidth is passed to this hook
  const ss3 = new SS3("SS3", "/Characters/SS3Sprite.png", 0, 0, 6, canvasWidth); // Pass canvasWidth to constructor

  const drawCharacter = (ctx) => {
    ss3.update(canvasWidth); // Pass current canvasWidth on update
    ss3.draw(ctx);
  };

  return { drawCharacter };
};
