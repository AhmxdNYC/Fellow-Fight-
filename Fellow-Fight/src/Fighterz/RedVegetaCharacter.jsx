import React, { useRef, useEffect } from 'react';
import { REDVEGETA } from './RedVegeta';  // Adjust the import path as needed

const REDVEGETACharacter = (props) => {
    const canvasRef = useRef(null);
    const redVegetaRef = useRef(null);

    useEffect(() => {
        // Initialize REDVEGETA once
        redVegetaRef.current = new REDVEGETA(
            "REDVEGETA",
            "./Characters/REDVEGETASprite.png",
            0,   // x position
            200, // y position
            6    // speed
        );

        const handleResize = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const { innerWidth: vw, innerHeight: vh } = window;
            const scale = Math.max(vw / 384, vh / 224);
            canvas.width = 384 * scale;
            canvas.height = 224 * scale;

            if (redVegetaRef.current) {
                redVegetaRef.current.canvasWidth = canvas.width;
                redVegetaRef.current.update();
                redVegetaRef.current.draw(ctx);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial draw

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef}></canvas>;
}

export default REDVEGETACharacter;
