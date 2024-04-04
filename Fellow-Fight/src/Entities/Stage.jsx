// Stage.jsx
import React, { useEffect } from 'react';
import { getRandomStageImage } from '../switchStage'; // Adjust the import path as needed

const Stage = ({ canvasRef }) => {
  useEffect(() => {
    const stageSrc = getRandomStageImage(); // Get a random stage image path
    const stageImage = new Image();
    stageImage.src = stageSrc;

    const drawStage = () => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext('2d');
      const { width, height } = canvasRef.current;

      ctx.drawImage(stageImage, 0, 0, width, height);
    };

    stageImage.onload = drawStage;
  }, [canvasRef]); // Dependency array might need adjustments if stageSrc should change dynamically

  return null; // This component does not render anything itself
};

export default Stage;
