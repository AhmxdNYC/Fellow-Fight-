import React, { useState, useEffect } from "react";
import { SS3 } from "../Fighterz/SS3";
import { REDVEGETA } from "../Fighterz/RedVegeta";
import { FighterState } from "../fighterDirection";

const FighterDebug = () => {
    const [selectedFighter, setSelectedFighter] = useState("");
    const [fighters, setFighters] = useState({
      SS3: new SS3("SS3", "/path/to/SS3Sprite.png", 0, 0, 5, 1440),
      REDVEGETA: new REDVEGETA("REDVEGETA", "/path/to/REDVEGETASprite.png", 0, 200, 5, 1440)
    });

  const handleFighterChange = (event) => {
    setSelectedFighter(event.target.value);
  };

  const handleDirectionChange = (direction) => {
    console.log('clicked', direction)
    if (selectedFighter && fighters[selectedFighter]) {
      fighters[selectedFighter].setDirection(direction);
      setFighters({ ...fighters });
    }
  };
  
  const handleStateChange = (state) => {
    if (selectedFighter && fighters[selectedFighter]) {
      fighters[selectedFighter].changeState(state);
      setFighters({ ...fighters });
    }
  };

  return (
    <div className="flex justify-center gap-10">
      <select onChange={handleFighterChange} value={selectedFighter}>
        <option value="">Select a Fighter</option>
        {Object.keys(fighters).map((name) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
      <button onClick={() => { handleDirectionChange("forwards"); handleStateChange(FighterState.WALK_FORWARDS); }}>Move Forwards</button>
      <button onClick={() => { handleDirectionChange("backwards"); handleStateChange(FighterState.WALK_BACKWARDS); }}>Move Backwards</button>
    </div>
  );
};

export default FighterDebug;