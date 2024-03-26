export class Fighter {
  constructor(name, src, x, y, speed) {
    this.name = name;
    this.image = new Image();
    this.loaded = false; // Add a flag to check if the image is loaded
    this.image.onload = () => {
      this.loaded = true; // Set to true once the image is loaded
      console.log(`${name} image loaded`); // Confirm image loading
    };
    this.image.onerror = () => {
      console.error(`Failed to load image at ${src}`); // Error handling for failed image load
    };
    this.image.src = src;
    this.position = { x, y };
    this.velocity = { x: speed, y: 0 };
  }

  update(canvasWidth) {
    if (!this.loaded) return; // Don't update if the image isn't loaded
  
    this.position.x += this.velocity.x;
  
    // Adjust for the image width to ensure the character reverses direction upon reaching the edge
    const characterRightEdge = this.position.x + this.image.width;
    if (this.position.x <= 0 || characterRightEdge >= canvasWidth) {
      this.velocity.x *= -1; // Reverse the horizontal velocity
    }
  }
  

  draw(context) {
    if (!this.loaded) return;
    context.setTransform(1, 0, 0, 1, 0, 0); // Reset transformations
    console.log(`Drawing ${this.name} at x=${this.position.x}, y=${this.position.y}`);
    context.drawImage(this.image, this.position.x, this.position.y);
  }
}
