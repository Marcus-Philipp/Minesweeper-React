import React from 'react';
import GameContext from './GameContext';
import GameBoard from './GameBoard';

const BOARD_HEIGHT = 10;
const BOARD_WIDTH = 10;

const GameLogic = () => {

    return (
        <GameContext.Provider>
            <GameBoard />
        </GameContext.Provider>
    );
};

export default GameLogic;