import React, { useContext } from 'react';
import GameContext from './GameContext';

const ControlPanel = () => {

    //Holt sich die aktuelle Schwierigkeitsstufe aus dem Kontext und die Setter Funktion
    const { DIFFICULTY, setDifficulty } = useContext(GameContext);

    return (
        <div className="space-x-5 mb-2 font-bold">
            <button className="transform hover:scale-105" onClick={() => setDifficulty(DIFFICULTY.Easy)}>Anfänger</button>
            <button className="transform hover:scale-105" onClick={() => setDifficulty(DIFFICULTY.Medium)}>Fortgeschrittene</button>
            <button className="transform hover:scale-105" onClick={() => setDifficulty(DIFFICULTY.Hard)}>Profis</button>
        </div>
    );
};

export default ControlPanel; 