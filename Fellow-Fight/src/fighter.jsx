export class Fighter {
  constructor(name, src, x, y, speed) {
    this.name = name
    this.image = new Image()
    this.loaded = false
    this.image.onload = () => {
      this.loaded = true
      console.log(`${name} image loaded`)
    }
    this.image.onerror = () => {
      console.error(`Failed to load image at ${src}`)
    }
    this.image.src = src
    this.position = { x, y }
    this.speed = speed
    // Initial setup for frames, to be overridden by subclasses
    this.frames = { default: [0, 0, 50, 50] } // Default frame
    this.currentFrame = "default"
  }

  update(canvasWidth) {
    if (!this.loaded) return
    // Simple left-right movement logic
    this.position.x += this.speed
    const [, , width] = this.frames[this.currentFrame]
    if (this.position.x <= 0 || this.position.x + width >= canvasWidth) {
      this.speed *= -1 // Reverse direction at canvas edges
    }
  }

  draw(context) {
    if (!this.loaded) return
    const [srcX, srcY, srcWidth, srcHeight] = this.frames[this.currentFrame]
    context.drawImage(
      this.image,
      srcX,
      srcY,
      srcWidth,
      srcHeight,
      this.position.x,
      this.position.y + 600,
      srcWidth,
      srcHeight
    )
  }
}
