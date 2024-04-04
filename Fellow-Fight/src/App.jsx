// App.jsx
import React from "react";
import Canvas from "./Canvas"; // Ensure this path matches your project structure

function App() {
  function showFPS() {
    const times = [];
    function refreshLoop() {
      window.requestAnimationFrame(() => {
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) {
          times.shift();
        }
        times.push(now);
        const fps = times.length;
        console.log(fps + " FPS");
        refreshLoop();
      });
    }
    refreshLoop();
  }
  // showFPS()
  return (
    <div className="bg-black min-h-screen min-w-screen flex justify-center items-center">
      <Canvas />
    </div>
  );
}

export default App;
