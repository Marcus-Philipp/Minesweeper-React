import React, { useContext } from 'react';
import GameContext from './GameContext';

const ExposedMines = () => {

    const { countedMines } = useContext(GameContext);

    return (
        <div>{countedMines}</div>
    );
};

export default ExposedMines;