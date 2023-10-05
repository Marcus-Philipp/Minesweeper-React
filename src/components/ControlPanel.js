import React, { useContext } from 'react';
import GameContext from './GameContext';

const ControlPanel = () => {

    const { DIFFICULTY, setDifficulty } = useContext(GameContext); //Holt sich die aktuelle Schwierigkeitsstufe aus dem Kontext und die Setter Funktion

    return (
        <div className="space-x-5">
            <button onClick={() => setDifficulty(DIFFICULTY.Easy)}>Anfänger</button>
            <button onClick={() => setDifficulty(DIFFICULTY.Medium)}>Fortgeschrittene</button>
            <button onClick={() => setDifficulty(DIFFICULTY.Hard)}>Profis</button>
        </div>
    );
};

export default ControlPanel; 