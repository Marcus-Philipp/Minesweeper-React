import React from "react";

const GameContext = React.createContext({
        DIFFICULTY: {
        Easy: { height: 10, width: 10, mines: 10 },
        Medium: { height: 16, width: 16, mines: 40 },
        Hard: { height: 22, width: 22, mines: 99 }
        },
        remainingMines: [],
        handleWithdrawal: () => {},
        setDifficulty: () => {},
        gameField: [],
        cellStates: [], // speichert den Zustand jeder Zelle (z.B. aufgedeckt, markiert usw.)
        handleCellClick: () => {},
        handleRightClick: () => {},
    });

export default GameContext;