import React from 'react';
import GameBoard from './GameBoard';

const BOARD_HEIGHT = 10;
const BOARD_WIDTH = 10;

const GameLogic = () => {

    return <GameBoard
        height={BOARD_HEIGHT}
        width={BOARD_WIDTH} />
};

export default GameLogic;