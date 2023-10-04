import React from 'react';
import Mine from '../mine-icon.png';
import Flag from '../flag-icon.png';

const Cell = ({ data, rowIndex, cellIndex }) => {

     const displayContent = (content) => {

        const colors = {
            1: 'blue',
            2: 'green',
            3: 'red',
            4: 'pink',
            5: 'yellow',
            6: 'violet',
            7: 'gray',
            8: 'purple'
        };

        if (content === 'M') {
            return <img src={Mine} alt='Mine'/>;
        } else if (typeof content === 'number') {
            return <span className={`text-${colors[content]}-500 font-bold`}>{content}</span>;
        } else {
            return content;
        }
     };
    
    return (
        <div className="flex items-center justify-center cursor-default bg-gray-300 border h-6 w-6">
            {displayContent(data)}
        </div>
    );
};

export default Cell;