// Black.jsx
import { useRef } from 'react';

export const useBlackCharacter = (canvasRef) => {
  const character = new Image();
  const characterProps = useRef({
    x: 0,
    y: 0,
    speed: 9,
    restarts: 0,
  });

  character.src = "/Charecters/black.png"; // Ensure this path is correct

  const drawCharacter = (ctx) => {
    const props = characterProps.current;

    props.x += props.speed;
    if (props.x > canvasRef.current.width - character.width || props.x < 0) {
      props.speed *= -1;
    }

    ctx.drawImage(character, props.x, props.y);
  };

  character.onload = () => {
    characterProps.current.x = 192 - character.width / 2; // Assuming game viewport width of 384
    characterProps.current.y = 400; // Adjust y as needed
  };

  return { drawCharacter };
};
