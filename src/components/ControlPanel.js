import React, { useContext } from 'react';
import GameContext from './GameContext';

const ControlPanel = () => {

    //Holt sich die aktuelle Schwierigkeitsstufe aus dem Kontext und die Setter Funktion
    const { DIFFICULTY, setDifficulty } = useContext(GameContext);

    return (
        <div className="mb-2 font-bold flex items-center justify-center">
            <div className="flex flex-col lg:flex-row lg:space-x-5">
            <button className="transform hover:scale-105" onClick={() => setDifficulty(DIFFICULTY.Easy)}>Anfänger</button>
            <button className="transform hover:scale-105" onClick={() => setDifficulty(DIFFICULTY.Medium)}>Fortgeschrittene</button>
            <button className="transform hover:scale-105" onClick={() => setDifficulty(DIFFICULTY.Hard)}>Profis</button>
            </div>
        </div>
    );
};

export default ControlPanel; 