import { FighterDirection } from "./fighterDirection"

export class Fighter {
  constructor(name, src, x, y, speed, direction) {
    this.name = name
    this.image = new Image()
    this.loaded = false
    this.image.onload = () => {
      this.loaded = true
      console.log(`${this.name} image loaded`)
    }
    this.image.onerror = () => {
      console.error(`Failed to load image at ${src}`)
    }
    this.image.src = src
    this.position = { x, y }
    this.speed = speed
    this.direction = direction
    this.frames = { default: [0, 0, 50, 50] }
    this.currentFrame = "default"
  }

  update(canvasWidth) {
    if (!this.loaded) return
    this.position.x += this.speed * this.direction
    const [, , width] = this.frames[this.currentFrame]
    if (this.position.x <= 0 || this.position.x + width >= canvasWidth) {
      this.direction *= -1 // Reverse direction and flip image
    }
  }

  draw(context) {
    if (!this.loaded) return
    const [srcX, srcY, srcWidth, srcHeight] = this.frames[this.currentFrame]
    context.save()
    context.scale(this.direction, 1) // Scale context to flip image
    let posX =
      this.direction === FighterDirection.RIGHT
        ? this.position.x
        : -this.position.x - srcWidth
    context.drawImage(
      this.image,
      srcX,
      srcY,
      srcWidth,
      srcHeight,
      posX,
      this.position.y + 600,
      srcWidth,
      srcHeight
    )
    context.restore()

    // Call to draw debug anchor with the direction passed
    this.drawDebug(
      context,
      posX,
      this.position.y + 600,
      srcWidth,
      srcHeight,
      this.direction
    )
  }

  drawDebug(context, x, y, width, height, direction) {
    const crossSize = 10 // Set the size of the cross arms
    context.save()
    context.strokeStyle = "red" // Set the color of the cross

    // Adjust x position based on the direction to ensure the cross appears at the top-left corner of the image
    if (direction === FighterDirection.LEFT) {
      x = -x - width + 30 // When flipped, adjust x position to mirror placement
    }

    context.beginPath()
    // Draw vertical line of the cross
    context.moveTo(x + crossSize / 2, y)
    context.lineTo(x + crossSize / 2, y + crossSize)
    // Draw horizontal line of the cross
    context.moveTo(x, y + crossSize / 2)
    context.lineTo(x + crossSize, y + crossSize / 2)
    context.stroke()
    context.restore()
  }
}
