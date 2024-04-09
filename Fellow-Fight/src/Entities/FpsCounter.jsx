export class FpsCounter {
  constructor() {
    this.fps = 0
  }

  update(secondsPassed) {
    this.fps = Math.trunc(1 / secondsPassed)
  }

  draw(context) {
    context.font = "bold 20px Arial"
    context.fillStyle = "black"
    context.textAlign = "center"
    context.fillText(`FPS: ${this.fps}`, context.canvas.width / 2, 30)
  }
}

const fpsCounter = new FpsCounter()

let lastFrameTime = window.performance.now()

const draw = () => {
  const now = window.performance.now()
  const secondsPassed = (now - lastFrameTime) / 1000
  lastFrameTime = now

  fpsCounter.update(secondsPassed)

  // Proceed with the rest of your drawing logic...
  window.requestAnimationFrame(draw)
}

window.requestAnimationFrame(draw)