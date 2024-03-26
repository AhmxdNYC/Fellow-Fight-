// Canvas.jsx
import React, { useRef } from "react";
import useCanvasLogic from './useCharecter'

function Canvas() {
  const canvasRef = useRef(null);

  // Use the custom hook to handle the drawing logic
  useCanvasLogic(canvasRef);

  return <canvas ref={canvasRef} className="bg-black"></canvas>;
}

export default Canvas;
