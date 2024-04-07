// Canvas.jsx
import React, { useRef } from "react";
import useCharacter from "./useCharecter";
import Stage from "./constants/Stage";

function Canvas() {
  const canvasRef = useRef(null);

  // Use custom hooks to handle drawing logic
  useCharacter(canvasRef);

  return (
    <div>
      <canvas ref={canvasRef} className="bg-black" />
      <Stage canvasRef={canvasRef} />
    </div>
  );
}

export default Canvas;
