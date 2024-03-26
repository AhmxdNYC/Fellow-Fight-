import React, { useEffect, useRef } from "react";
import stageSrc from '/Stages/namek.png'; // Import the stage image

function App() {
  const canvasRef = useRef(null);
  const character = new Image(); // For the moving character
  const stage = new Image(); // For the stage image
  const characterProps = useRef({
    x: 0, // Temporary placeholder values
    y: 0, // Will be recalculated
    speed: 2,
    restarts: 0,
  });

  useEffect(() => {
    const gameViewPort = {
      WIDTH: 384,
      HEIGHT: 224,
    };

    const canvasEl = canvasRef.current;
    const context = canvasEl.getContext("2d");
    const SS3 = "/Charecters/SS3.png"; // Ensure this path is correct

    stage.src = stageSrc; // Set the source for the stage image
    character.src = SS3; // Set the source for the character image

    character.onload = () => {
      // Now that character is loaded, calculate initial x, y position
      characterProps.current.x = gameViewPort.WIDTH / 2 - character.width / 2;
      characterProps.current.y = 400; // Adjust y as needed
      drawCharacter();
    };

    stage.onload = resizeCanvas; // Ensure the stage is loaded before setting up the canvas
    character.onerror = (error) => console.error("Failed to load character", error);

    function resizeCanvas() {
      const { innerWidth: vw, innerHeight: vh } = window;
      const scale = Math.max(vw / gameViewPort.WIDTH, vh / gameViewPort.HEIGHT);

      canvasEl.width = gameViewPort.WIDTH * scale;
      canvasEl.height = gameViewPort.HEIGHT * scale;
      canvasEl.style.width = `${vw}px`;
      canvasEl.style.height = `${vh}px`;

      context.drawImage(stage, 0, 0, canvasEl.width, canvasEl.height);
      context.save();
      context.scale(scale, scale);
      drawGraphics();
      context.restore();
    }

    function drawGraphics() {
      // Optional: Any additional drawing logic for the stage
    }

    function drawCharacter() {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        const props = characterProps.current;

        props.x += props.speed;

        if (props.x > canvasRef.current.width - character.width || props.x < 0) {
          props.speed *= -1;
        }

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(stage, 0, 0, canvasEl.width, canvasEl.height);
        ctx.drawImage(character, props.x, props.y);
        window.requestAnimationFrame(drawCharacter);
      }
    }

    window.requestAnimationFrame(drawCharacter);
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <div className="bg-black min-h-screen min-w-screen flex justify-center items-center">
      <canvas ref={canvasRef} id="canvas" className="bg-black"></canvas>
    </div>
  );
}

export default App;
