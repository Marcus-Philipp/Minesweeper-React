import React, {useState} from 'react';
import GameContext from './GameContext';
import GameBoard from './GameBoard';

const GameLogic = () => {

    const DIFFICULTY = {
        EASY: { height: 10, width: 10, mines: 10 },
        MEDIUM: { height: 16, width: 16, mines: 40 },
        HARD: { height: 22, width: 22, mines: 99 }
    };

    const [difficulty, setDifficulty] = useState(DIFFICULTY.EASY)

    //2D-Array erstellen
    const initialField = Array.from({ length: difficulty.height }, () => Array(difficulty.width).fill(null));

    //Minen im Feld platzieren
    const placeMines = (field, mines, height, width) => {
        let placed = 0;

        while (placed < mines) {
            const x = Math.floor(Math.random() * width);
            const y = Math.floor(Math.random() * height);

            if (field[y][x] === null) {
                field[y][x] = 'M';
                placed++;
            }
        }

        return field;
    };

    const gameField = placeMines(initialField, difficulty.mines, difficulty.height, difficulty.width);

    return (
        <GameContext.Provider value={{ gameField }}>
            <GameBoard />
        </GameContext.Provider>
    );
};

export default GameLogic;