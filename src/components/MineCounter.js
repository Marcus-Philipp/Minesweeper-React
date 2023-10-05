import React, { useContext } from 'react';
import GameContext from './GameContext';

const MineCounter = () => {

    const { remainingMines } = useContext(GameContext); //Holt sich den Zustand der Minen aus dem Kontext

    return (
        <div>{remainingMines}</div>
    );
};

export default MineCounter;