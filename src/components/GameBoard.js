import React from 'react';

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
                        <button className="bg-black h-5 w-5 border active:bg-gray-300" key={cellIndex}></button>
                    ))}
                </div>
            ))}
           </div>
        </div>
    );
};

export default GameBoard;