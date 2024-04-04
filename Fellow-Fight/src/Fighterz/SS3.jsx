import { Fighter } from "../fighter" // Adjust the path as necessary

class SS3 extends Fighter {
  constructor(name, src, x, y, speed) {
    super(name, src, x, y, speed);
    // Define SS3-specific frames using object literals
    this.frames = {
      "forwards-1": [143, 524, 40, 50],
      "forwards-2": [54, 594, 41, 52],
      // Add additional frame definitions as needed
    };
    this.currentFrame = "forwards-1"; // Set the initial animation frame
    this.frameKeys = Object.keys(this.frames); // Keys of the frames for cycling
    this.frameIndex = 0; // Current index in the frameKeys array
    this.animationCounter = 0; // Counter to control animation speed
    this.animationSpeed = 10; // Adjust this to control frame switch speed
  }

  cycleFrames() {
    this.animationCounter++;
    if (this.animationCounter >= this.animationSpeed) {
      this.frameIndex = (this.frameIndex + 1) % this.frameKeys.length;
      this.currentFrame = this.frameKeys[this.frameIndex];
      this.animationCounter = 0; // Reset the counter
    }
  }

  update(canvasWidth) {
    super.update(canvasWidth); // Call the base class update
    this.cycleFrames(); // Additional call to handle frame cycling
  }
}


// Custom hook remains the same
export const useSS3Character = (canvasRef) => {
  const ss3 = new SS3("SS3", "/Characters/SS3Sprite.png", 0, 0, 4);

  const drawCharacter = (ctx, canvasWidth) => {
    ss3.update(canvasWidth);
    ss3.draw(ctx);
  };

  return { drawCharacter };
};

