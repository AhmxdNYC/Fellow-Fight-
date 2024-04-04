// StageClass.js
export class Stage {
  constructor(src) {
    this.image = new Image();
    this.src = src;
    this.loaded = false;
    this.image.onload = () => (this.loaded = true);
    this.image.src = src;
  }

  update() {
    // Nothing needed here for a static image, but method exists for consistency
  }

  draw(context) {
    if (!this.loaded) return;
    context.drawImage(
      this.image,
      0,
      0,
      context.canvas.width,
      context.canvas.height
    );
  }
}
