import React, { useEffect, useState } from 'react';
import GameContext from './GameContext';

const GameLogic = ({ children }) => {

    //Schwierigkeitsstufen
    const DIFFICULTY = {
        Easy: { height: 10, width: 10, mines: 10 },
        Medium: { height: 16, width: 16, mines: 40 },
        Hard: { height: 22, width: 22, mines: 99 }
    };

    //Zustand der Schwierigkeit/groesse des Feldes
    const [difficulty, setDifficulty] = useState(DIFFICULTY.Easy);

    //Zustand des Spielfeldes
    const [gameField, setGameField] = useState([]);

    //Zustand der Minen im Spielfeld/Flagge gesetzt uebrig gebliebene
    const [remainingMines, setRemainingMines] = useState(0);

    //Zustand des vorherigen Spielfeldes
    const [prevCellStates, setPrevCellStates] = useState(null);

    //Zustand des aktuellen Spielfeldes
    const [cellStates, setCellStates] = useState(() =>
        Array.from({ length: difficulty.height }, () =>
            Array.from({ length: difficulty.width }, () => ({ isRevealed: false, isFlagged: false }))
        ));


    //Wird beim initialisieren ausgefuehrt und sobald sich die Schwierigkeit aendert
    useEffect(() => {
        //2D-Array erstellen
        const initialField = Array.from({ length: difficulty.height }, () => Array(difficulty.width).fill(null));
        //Minen zum Spielfeld hinzufuegen
        const initialMines = placeMines(initialField, difficulty.mines, difficulty.height, difficulty.width);
        //Spielfeld erstellen und Anzahl der Minen initialisieren
        const newField = numberCounter(copyField(initialMines));
        setGameField(newField);
        setRemainingMines(difficulty.mines)
        //
        setCellStates(
            Array.from({ length: difficulty.height }, () =>
                Array.from({ length: difficulty.width }, () => ({ isRevealed: false, isFlagged: false }))
            )
        );
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
    const numberCounter = (field) => {
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

    //Funktion um die zugedeckten Felder aufzudecken
    const handleCellClick = (rowIndex, cellIndex) => {

        savePrevState();

        const newCellStates = [...cellStates];

        if (!newCellStates[rowIndex][cellIndex].isFlagged) {
            if (gameField[rowIndex][cellIndex] === ' ') {
                floodFill(rowIndex, cellIndex, newCellStates);
            }
            newCellStates[rowIndex][cellIndex].isRevealed = true;
        }

        setCellStates(newCellStates);
    };

    //Sucht umliegende freie Felder und deckt diese auf
    const floodFill = (rowIndex, cellIndex, states) => {
        if (rowIndex < 0 || rowIndex >= difficulty.height || cellIndex < 0 || cellIndex >= difficulty.width) {
            return;
        }

        if (states[rowIndex][cellIndex].isRevealed || states[rowIndex][cellIndex].isFlagged) {
            return;
        }

        states[rowIndex][cellIndex].isRevealed = true;

        if (gameField[rowIndex][cellIndex] === ' ') {
            const surrounding = [[0, 1], [0, -1], [-1, -1], [-1, 0], [-1, 1], [1, -1], [1, 0], [1, 1]];
            for (let [dy, dx] of surrounding) {
                floodFill(rowIndex + dy, cellIndex + dx, states);
            }
        }

    };


    //Funktion um die Flagge zu setzen per Rechtsklick
    const handleRightClick = (rowIndex, cellIndex, event) => {
        event.preventDefault();

        const newCellStates = [...cellStates];

        if (!newCellStates[rowIndex][cellIndex].isRevealed) {
            newCellStates[rowIndex][cellIndex].isFlagged = !newCellStates[rowIndex][cellIndex].isFlagged;

            setRemainingMines(prev => newCellStates[rowIndex][cellIndex].isFlagged ? prev - 1 : prev + 1);
        }

        setCellStates(newCellStates);
    };

    //Event um den alten Status zurueckzusetzen
    const handleWithdrawal = () => {
        if (prevCellStates) {

            setCellStates([...prevCellStates]);
        }
    };

    //Funktion um eine Tiefenkopie des alten Zustandes zu speichern
    const savePrevState = () => {
        const deepCopy = cellStates.map(row => row.map(cell => ({...cell})));
        setPrevCellStates(deepCopy);
    };


    return (
        <GameContext.Provider value={{ gameField, cellStates, handleCellClick, handleRightClick, difficulty, setDifficulty, DIFFICULTY, remainingMines, handleWithdrawal }}>
            {children}
        </GameContext.Provider>
    );
};

export default GameLogic;