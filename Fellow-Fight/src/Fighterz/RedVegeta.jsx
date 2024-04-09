import { Fighter } from "../constants/fighter"; // Ensure the path is correct
import { FighterDirection } from "../fighterDirection";

export class REDVEGETA extends Fighter {
  constructor(name, src, x, y, speed, canvasWidth) {  // Include canvasWidth in the constructor
    super(name, src, x, y, speed, FighterDirection.LEFT, canvasWidth); // Pass canvasWidth to Fighter if needed
    this.canvasWidth = canvasWidth; // Store canvasWidth in the instance for further use

    this.frames = {
      "forwards-1": [150, 191, 31, 48],
      "forwards-2": [94, 200, 29, 35],
      "forwards-3": [129, 208, 60, 26],
      "forwards-4": [201, 206, 39, 23],
      "forwards-5": [244, 208, 40, 19],
      "forwards-6": [346, 198, 26, 35],
    };
    this.currentFrame = "forwards-1";
    this.frameKeys = Object.keys(this.frames);
    this.frameIndex = 0;
    this.animationCounter = 0;
    this.animationSpeed = 50;
  }

  setDirection(newDirection) {
    console.log(`Changing direction to: ${newDirection}`);  // Debug log
    this.direction = newDirection;
    this.changeState(newDirection === 'forwards' ? FighterState.WALK_FORWARDS : FighterState.WALK_BACKWARDS);
  }
  
  update(canvasWidth) {
    super.update(canvasWidth); // Calls the base class update method with canvasWidth
    console.log(canvasWidth, "width from vegeta");
    this.cycleFrames(); // Update to cycle through frames
  }

  cycleFrames() {
    this.animationCounter++;
    if (this.animationCounter >= this.animationSpeed) {
      this.frameIndex = (this.frameIndex + 1) % this.frameKeys.length;
      this.currentFrame = this.frameKeys[this.frameIndex];
      this.animationCounter = 0;
    }
  }
}

export const useREDVEGETACharacter = (canvasRef, canvasWidth) => {
  const redVegeta = new REDVEGETA(
    "REDVEGETA",
    "./Characters/REDVEGETASprite.png",
    0,  // x position
    200, // y position
    6,   // speed
    canvasWidth  // Passing canvasWidth obtained from props or state
  );

  const drawCharacter = (ctx) => {
    redVegeta.update(canvasWidth); // Pass current canvasWidth on update
    redVegeta.draw(ctx);
  };

  return { drawCharacter };
};
