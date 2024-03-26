// SS3.jsx
import { Fighter } from "./fighter"; // Ensure this path is correct

export const useSS3Character = (canvasRef) => {
  const ss3 = new Fighter("SS3", "/Charecters/SS3.png", 0, 400, 5); // Initialize with default values

  const drawCharacter = (ctx, canvasWidth) => {
    ss3.update(canvasWidth); // Now passing canvasWidth
    ss3.draw(ctx); // Draw fighter on canvas
  };

  return { drawCharacter };
};
