import { createContext, useContext, useState, useEffect } from 'react';

// Create a context for the canvas width
export const CanvasWidthContext = createContext();

// Custom hook to use the context
export const useCanvasWidth = () => useContext(CanvasWidthContext);

// Provider component
export const CanvasWidthProvider = ({ children }) => {
    const [canvasWidth, setCanvasWidth] = useState(window.innerWidth); // Default to window width

    useEffect(() => {
        const handleResize = () => {
            setCanvasWidth(window.innerWidth); // Update width on resize
            console.log("Updated canvas width:", window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <CanvasWidthContext.Provider value={canvasWidth}>
            {children}
        </CanvasWidthContext.Provider>
    );
};
