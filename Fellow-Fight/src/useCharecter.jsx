import { useEffect, useRef } from "react";
import { useSS3Character } from "./Fighterz/SS3"; // Ensure this path is correct
import { useBLACKCharacter } from "./Fighterz/BLACK"; // Ensure this path is correct
import { FpsCounter } from "./Entities/FpsCounter"; // Ensure this path is correct
import stageSrc from "/Stages/namek.png"; // Adjust as necessary

const useCharacter = (canvasRef) => {
  
  const stage = new Image();
  stage.src = stageSrc;
  const fpsCounter = new FpsCounter();

  useEffect(() => {
    const gameViewPort = {
      WIDTH: 384, // Adjust this width as necessary
      HEIGHT: 224, // Adjust this height as necessary
    };

    const { drawCharacter: drawSS3Character } = useSS3Character(canvasRef);
    const { drawCharacter: drawBLACKCharacter } = useBLACKCharacter(canvasRef);

    const resizeCanvas = () => {
      if (!canvasRef.current) return;
      const { innerWidth: vw, innerHeight: vh } = window;
      const scale = Math.max(vw / gameViewPort.WIDTH, vh / gameViewPort.HEIGHT);
      const canvasEl = canvasRef.current;
      const context = canvasEl.getContext("2d");

      canvasEl.width = gameViewPort.WIDTH * scale;
      canvasEl.height = gameViewPort.HEIGHT * scale;
      canvasEl.style.width = `${vw}px`;
      canvasEl.style.height = `${vh}px`;

      context.drawImage(stage, 0, 0, canvasEl.width, canvasEl.height);
      context.save();
      context.scale(scale, scale);
      context.restore();
    };

    let lastFrameTime = performance.now();

    const draw = () => {
      const now = performance.now();
      const deltaTime = (now - lastFrameTime) / 1000;
      lastFrameTime = now;

      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d");
      const canvasWidth = canvasRef.current.width / ctx.getTransform().a;

      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(
        stage,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      drawSS3Character(ctx, canvasWidth);
      drawBLACKCharacter(ctx, canvasWidth);

      // Update and draw the FPS counter
      fpsCounter.update(deltaTime);
      fpsCounter.draw(ctx);

      window.requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    draw(); // Start the drawing loop

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []); // Empty dependency array ensures setup runs only once
};

export default useCharacter;
