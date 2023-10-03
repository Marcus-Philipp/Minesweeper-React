import React from 'react';

const Cell = ({ data, rowIndex, cellIndex }) => {
    
    return (
        <div className="flex items-center justify-center cursor-default bg-gray-300 border h-6 w-6">
            {data}
        </div>
    );
};

export default Cell;