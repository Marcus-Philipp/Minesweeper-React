import React, { useContext } from 'react';
import GameContext from './GameContext';

const MineCounter = () => {

    const { remainingMines } = useContext(GameContext);

    return (
        <div>{remainingMines}</div>
    );
};

export default MineCounter;