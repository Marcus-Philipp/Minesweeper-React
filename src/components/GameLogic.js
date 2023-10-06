import React, { useCallback, useEffect, useState } from 'react';
import GameContext from './GameContext';

const SURROUNDING_CELLS = [[0, 1], [0, -1], [-1, -1], [-1, 0], [-1, 1], [1, -1], [1, 0], [1, 1]];

const GameLogic = ({ children }) => {

    //Schwierigkeitsstufen + Eigenschaften
    const DIFFICULTY = {
        Easy: { height: 10, width: 10, mines: 10 },
        Medium: { height: 16, width: 16, mines: 40 },
        Hard: { height: 20, width: 24, mines: 99 }
    };

    //Zustand des Spielfeldes
    const [gameField, setGameField] = useState([]);

    //Zustand ob das Spiel laeuft oder zu Ende ist
    const [gameOver, setGameOver] = useState(false);

    //Zustand der Schwierigkeit/groesse des Feldes
    const [difficulty, setDifficulty] = useState(DIFFICULTY.Easy);

    //Zustand der Minen im Spielfeld/Flagge gesetzt uebrig gebliebene
    const [remainingMines, setRemainingMines] = useState(0);

    //Zustand der aufgdeckten Minen
    const [countedMines, setCountedMines] = useState(0);

    //Zustand des vorherigen Spielfeldes
    const [prevCellStates, setPrevCellStates] = useState(null);

    //Erzeugt einen Zustand der Zellen
    const createInitialCellStates = useCallback(() => {
        return Array.from({ length: difficulty.height }, () =>
            Array.from({ length: difficulty.width }, () => ({ isRevealed: false, isFlagged: false }))
        );
    }, [difficulty.height, difficulty.width]);

    //Zustand des aktuellen Spielfeldes
    const [cellStates, setCellStates] = useState(createInitialCellStates);

    //Erzeugt ein nues Spielfeld und kann es auch zuruecksetzen
    const resetGame = useCallback(() => {

        const initialField = Array.from({ length: difficulty.height }, () => Array(difficulty.width).fill(null));
        const initialMines = placeMines(initialField, difficulty.mines, difficulty.height, difficulty.width);
        const newField = numberCounter(copyField(initialMines));

        setGameField(newField);
        setRemainingMines(difficulty.mines)
        setCountedMines(0);
        setCellStates(createInitialCellStates());
        setGameOver(false);

    }, [difficulty, createInitialCellStates]);

    //Wird beim initialisieren ausgefuehrt und sobald sich die Schwierigkeit aendert oder das Spiel neu gestartet wird
    useEffect(() => {
        resetGame();
    }, [resetGame]);


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
                    let count = 0;
                    for (let [dy, dx] of SURROUNDING_CELLS) {
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
        if (gameOver) {
            return;
        }

        savePreviousState();

        const newCellStates = [...cellStates];

        if (!newCellStates[rowIndex][cellIndex].isFlagged) {
            if (gameField[rowIndex][cellIndex] === ' ') {
                floodFill(rowIndex, cellIndex, newCellStates);
            }
            newCellStates[rowIndex][cellIndex].isRevealed = true;
        }

        if (gameField[rowIndex][cellIndex] === 'M') {
            setGameOver(true);
            setCountedMines(prev => prev + 1);
            return;
        }

        if (fieldChecker(newCellStates)) {
           uncoverFields(newCellStates);
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
            for (let [dy, dx] of SURROUNDING_CELLS) {
                floodFill(rowIndex + dy, cellIndex + dx, states);
            }
        }

    };

    //Funktion um die Flagge zu setzen per Rechtsklick
    const handleRightClick = (rowIndex, cellIndex, event) => {
        event.preventDefault();

        if (gameOver) {
            return;
        }

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
            setGameOver(false);
            setCellStates([...prevCellStates]);
        }
    };

    //Funktion um eine Tiefenkopie des vorherigen Spielzustandes zu speichern
    const savePreviousState = () => {
        const deepCopy = cellStates.map(row => row.map(cell => ({ ...cell })));
        setPrevCellStates(deepCopy);
    };

    //Zaehlt alle aufgedeckten Felder
    const fieldChecker = (cellStatesCopy) => {
        for (let row = 0; row < cellStatesCopy.length; row++) {
            for (let col = 0; col < cellStatesCopy[row].length; col++) {
                if (!cellStatesCopy[row][col].isRevealed) {
                    if (gameField[row][col] !== 'M') {
                        return false;
                    }
                }
            }
        }
        return true;
    };

    //Deckt alle Felder auf in denen Minen sind
    const uncoverFields = (cellStatesCopy) => {
        for (let row = 0; row < cellStatesCopy.length; row++) {
            for (let col = 0; col < cellStatesCopy[row].length; col++) {
                if (gameField[row][col] === 'M') {
                  cellStatesCopy[row][col].isRevealed = true;  
                } 
                if (cellStatesCopy[row][col].isFlagged) {
                    cellStatesCopy[row][col].isFlagged = false;
                }
            }
        }
        setCellStates(cellStatesCopy);
    };

    return (
        <GameContext.Provider value={{ gameField, cellStates, handleCellClick, handleRightClick, difficulty, setDifficulty, DIFFICULTY, remainingMines, handleWithdrawal, countedMines, resetGame }}>
            {children}
        </GameContext.Provider>
    );
};

export default GameLogic;