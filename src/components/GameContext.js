import React from "react";

//Erstellt einen Kontext fuer das Spiel
const GameContext = React.createContext({
        
        //Schwierigkeitsstufen fuer das Spiel, Groesse und Minenanzahl
        DIFFICULTY: {
        Easy: { height: 10, width: 10, mines: 10 },
        Medium: { height: 16, width: 16, mines: 40 },
        Hard: { height: 22, width: 22, mines: 99 }
        },

        //Liste der verbleibenden Minen im Spiel
        remainingMines: [],

        //Anzahl der Minen die aufgedeckt wurden
        countedMines: [],

        //Methode, um den vorherigen Spielstand aufzurufen
        handleWithdrawal: () => {},

        //Methode, um die Schwierigkeitsstufe zu setzen
        setDifficulty: () => {},

        //Ein 2D Array als Spielfeld, das Minen und Zahlen enthaelt
        gameField: [],

        //speichert den Zustand jeder Zelle (z.B. aufgedeckt, markiert usw.)
        cellStates: [],

        //Methode, die aufgerufen wird, wenn eine Zelle angeklickt wird.
        handleCellClick: () => {},

        //Methode, die aufgerufen wird, wenn mit der rechten Maustaste auf eine Zelle geklickt wird
        handleRightClick: () => {},
    });

export default GameContext;