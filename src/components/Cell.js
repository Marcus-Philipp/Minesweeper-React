import React, { useContext } from 'react';
import GameContext from './GameContext';
import Mine from '../mine-icon.png';
import Flag from '../flag-icon.png';

const Cell = ({ cellValue, rowIndex, cellIndex }) => {

    const { cellStates, handleCellClick, handleRightClick } = useContext(GameContext);

    const currentCellState = cellStates[rowIndex][cellIndex];

    const displayContent = (content) => {

        const colors = {
            1: 'blue',
            2: 'green',
            3: 'red',
            4: 'yellow',
            5: 'pink',
            6: 'violet',
            7: 'gray',
            8: 'purple'
        };

        if (content === 'M') {
            return <img src={Mine} alt='Minenicon' />;
        } else if (typeof content === 'number') {
            return <span className={`text-${colors[content]}-500 font-bold`}>{content}</span>;
        } else {
            return content;
        }
    };

    return (
        <div
            className="flex items-center justify-center cursor-default bg-gray-300 border h-6 w-6"
            onClick={() => handleCellClick(rowIndex, cellIndex)}
            onContextMenu={(event) => handleRightClick(rowIndex, cellIndex, event)}>
            {currentCellState.isFlagged ? <img src={Flag} alt='flagicon'/> : currentCellState.isRevealed ? displayContent(cellValue) : <div className="h-5 w-5 bg-green-500"></div>}
        </div>
    );
};

export default Cell;