import { useEffect } from 'react';
import { useSS3Character } from './SS3'; // Adjust the import path as needed
import stageSrc from '/Stages/namek.png';

const useCharacter = (canvasRef) => {
  const stage = new Image();
  stage.src = stageSrc;

  // Use the custom hook to manage the fighter character
  const { drawCharacter } = useSS3Character(canvasRef);

  useEffect(() => {
    const gameViewPort = {
      WIDTH: 384,
      HEIGHT: 224,
    };

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

    const draw = () => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext('2d');
      // This line ensures the canvas width used matches the actual drawing area.
      const canvasWidth = canvasRef.current.width / ctx.getTransform().a;

      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(stage, 0, 0, canvasRef.current.width, canvasRef.current.height);

      // This ensures the updated canvas width is passed for correct boundary checking.
      drawCharacter(ctx, canvasWidth); 

      window.requestAnimationFrame(draw);
    };

    stage.onload = () => {
      resizeCanvas();
      draw(); // Start the drawing loop
    };

    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []); // Dependencies array is empty as we're not expecting external changes

  // No need to return anything from this hook
};

export default useCharacter;
