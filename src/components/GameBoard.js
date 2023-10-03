import React from 'react';
import Cell from './Cell';

const GameBoard = ({ height, width }) => {
    const ROWS = height;
    const COLS = width;

    //2D-Array erstellen
    const board = Array.from({length: ROWS}, () => Array(COLS).fill(null));

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
           <div>
            {board.map((row, rowIndex) => (
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