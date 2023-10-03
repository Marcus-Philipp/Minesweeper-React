import React, { useEffect, useState } from 'react';
import GameContext from './GameContext';
import GameBoard from './GameBoard';

const GameLogic = () => {

    //Schwierigkeitsstufen
    const DIFFICULTY = {
        Easy: { height: 10, width: 10, mines: 10 },
        Medium: { height: 16, width: 16, mines: 40 },
        Hard: { height: 22, width: 22, mines: 99 }
    };

    const [difficulty, setDifficulty] = useState(DIFFICULTY.Easy);

    const [gameField, setGameField] = useState([]);

    
    useEffect(() => {
        //2D-Array erstellen
        const initialField = Array.from({ length: difficulty.height }, () => Array(difficulty.width).fill(null));
        //Spielfeld erstellen
        const initialMines = placeMines(initialField, difficulty.mines, difficulty.height, difficulty.width);
        //Neues Spielfeld erstellen bei Aenderung der Schwierigkeit
        const newField = mineCounter(copyField(initialMines));
        setGameField(newField);
    }, [difficulty]);

    //Minen im Feld platzieren
    const placeMines = (field, mines, height, width) => {
        let placed = 0;

        while (placed < mines) {
            const x = Math.floor(Math.random() * width);
            const y = Math.floor(Math.random() * height);

            if (field[y][x] !== 'M') {
                field[y][x] = 'M';
                placed++;
            }
        }

        return field;
    };


    //Flache Kopie des Spielfeldes erstellen
    const copyField = (originalField) => {
        return originalField.map(row => [...row]);
    };

    //Sucht umliegende Minen und gibt der Zelle die entsprechende Nummer
    const mineCounter = (field) => {
        for (let i = 0; i < field.length; i++) {
            for (let j = 0; j < field[i].length; j++) {

                if (field[i][j] !== 'M') {
                    const surrounding = [[0, 1], [0, -1], [-1, -1], [-1, 0], [-1, 1], [1, -1], [1, 0], [1, 1]];
                    let count = 0;
                    for (let [dy, dx] of surrounding) {
                        let newI = i + dy;
                        let newJ = j + dx;
                        if (newI >= 0 && newI < field.length && newJ >= 0 && newJ < field[i].length && field[newI][newJ] === 'M') {
                            count++;
                        };
                    };

                    if (count > 0) {
                        field[i][j] = count;
                    } else {
                        field[i][j] = ' ';
                    }
                };
            }
        };

        return field;
    };

    return (
        <GameContext.Provider value={{ gameField }}>
            <GameBoard />
        </GameContext.Provider>
    );
};

export default GameLogic;