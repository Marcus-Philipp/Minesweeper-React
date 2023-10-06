import React, { useContext } from 'react';
import GameContext from './GameContext';
import Mine from '../mine-icon.png';

const MineCounter = () => {

    //Holt sich den Zustand der Minen aus dem Kontext
    const { remainingMines } = useContext(GameContext);

    return (
        <div className="flex justify-center items-center">Vorhandene <img className="w-7 h-7" src={Mine} alt="MinenIcon" /><span>{remainingMines}</span></div>
    );
};

export default MineCounter;