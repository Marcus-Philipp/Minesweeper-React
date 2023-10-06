import React, { useContext } from 'react';
import GameContext from './GameContext';
import Cell from './Cell';
import ControlPanel from './ControlPanel';
import MineCounter from './MineCounter';
import Withdrawal from './Withdrawal';
import ExposedMines from './ExposedMines';
import PlayButton from './PlayButton';

const GameBoard = () => {

    //Holt sich das Spielfeld aus dem Kontext
    const { gameField } = useContext(GameContext);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-green-50">
            <ControlPanel />
            <PlayButton />
            <div>
                <div className="flex flex-col items-center justify-between lg:flex-row"><MineCounter />
                    <ExposedMines /></div>
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