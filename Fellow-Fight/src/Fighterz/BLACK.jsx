// BLACK.jsx
import { Fighter } from "../fighter" // Adjust the import path as necessary

export const useBLACKCharacter = (canvasRef) => {
  const black = new Fighter("BLACK", "/Characters/black.png", 1400, 180, 4) // Adjust positions and speed as necessary

  const drawCharacter = (ctx, canvasWidth) => {
    black.update(canvasWidth) // Pass the canvas width for boundary checking
    black.draw(ctx) // Draw BLACK on canvas
  }

  return { drawCharacter }
}
