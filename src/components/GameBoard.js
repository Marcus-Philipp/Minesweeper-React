import React, { useContext } from 'react';
import GameContext from './GameContext';
import Cell from './Cell';
import ControlPanel from './ControlPanel';
import MineCounter from './MineCounter';

const GameBoard = () => {

    const { gameField } = useContext(GameContext);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <ControlPanel />
            <div>
                <MineCounter />
                {gameField.map((row, rowIndex) => (
                    <div className="flex" key={rowIndex}>
                        {row.map((cellData, cellIndex) => (
                            <Cell
                                key={cellIndex}
                                data={cellData}
                                rowIndex={rowIndex}
                                cellIndex={cellIndex} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameBoard;