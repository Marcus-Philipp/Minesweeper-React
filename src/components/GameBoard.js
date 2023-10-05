import React, { useContext } from 'react';
import GameContext from './GameContext';
import Cell from './Cell';
import ControlPanel from './ControlPanel';
import MineCounter from './MineCounter';
import Withdrawal from './Withdrawal';
import ExposedMines from './ExposedMines';

const GameBoard = () => {

    const { gameField } = useContext(GameContext); //Holt sich das Spielfeld aus dem Kontext

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <ControlPanel />
            <div>
                <MineCounter />
                <ExposedMines />
                {gameField.map((row, rowIndex) => (
                    <div className="flex" key={rowIndex}>
                        {row.map((cellData, cellIndex) => (
                            <Cell
                                key={cellIndex}
                                cellValue={cellData}
                                rowIndex={rowIndex}
                                cellIndex={cellIndex} />
                        ))}
                    </div>
                ))}
            </div>
            <Withdrawal />
        </div>
    );
};

export default GameBoard;