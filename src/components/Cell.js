import React, { useContext } from 'react';
import GameContext from './GameContext';
import Mine from '../mine-icon.png';
import Flag from '../flag-icon.png';

const Cell = ({ cellValue, rowIndex, cellIndex }) => {

    //Holt sich die benoetigten Daten und Werte aus dem Kontext
    const { cellStates, handleCellClick, handleRightClick } = useContext(GameContext);

    const currentCellState = cellStates[rowIndex][cellIndex];

    //Funktion um die Hintergrundfarbe der Minen anzuzeigen
    const backgroundMines = () => {
        if (currentCellState.isRevealed && cellValue === 'M') {
            return "bg-red-600";
        } else {
            return "bg-slate-300";
        }
    };

    //Funktion wie der Inhalt einer Zelle auszusehen hat
    const displayContent = (content) => {
        
        //Farbkodierung fuer Zahlen
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
            return <span className={`text-${colors[content]}-500 font-bold text-2xl`}>{content}</span>;
        } else {
            return content;
        }
    };

    return (
        <div
            className={`flex items-center justify-center cursor-default lg:h-7 lg:w-7 border ${backgroundMines()}`}
            onClick={() => handleCellClick(rowIndex, cellIndex)}
            onContextMenu={(event) => handleRightClick(rowIndex, cellIndex, event)}>
            {currentCellState.isFlagged ? <img src={Flag} alt='flagicon'/> : currentCellState.isRevealed ? displayContent(cellValue) : <div className=" lg:h-6 lg:w-6 bg-slate-600 hover:bg-slate-800"></div>}
        </div>
    );
};

export default Cell;