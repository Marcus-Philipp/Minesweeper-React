import React, { useContext } from 'react';
import GameContext from './GameContext';

const ControlPanel = () => {

    const { DIFFICULTY, setDifficulty } = useContext(GameContext);

    return (
        <div>
            <button onClick={() => setDifficulty(DIFFICULTY.Easy)}>Anfaenger</button>
            <button onClick={() => setDifficulty(DIFFICULTY.Medium)}>Fortgeschrittene</button>
            <button onClick={() => setDifficulty(DIFFICULTY.Hard)}>Profis</button>
        </div>
    );
};

export default ControlPanel; 