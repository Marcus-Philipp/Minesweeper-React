import React, { useContext } from "react";
import GameContext from "./GameContext";
import Cell from "./Cell";
import ControlPanel from "./ControlPanel";
import MineCounter from "./MineCounter";
import Withdrawal from "./Withdrawal";
import ExposedMines from "./ExposedMines";
import PlayButton from "./PlayButton";
import Logo from './Logo';
import { useMediaQuery } from "react-responsive";

const GameBoard = () => {
  
  //Holt sich das Spielfeld aus dem Kontext
  const { gameField } = useContext(GameContext);

  //React Responsive MediaQuery deklariert
  const isDesktop = useMediaQuery({ query: '(min-width: 600px)' });

  return (
    <div className="flex flex-col flex-1 justify-start items-center min-h-screen bg-green-600 md:flex-row">
      <Logo />
      <div className="flex flex-col justify-center items-center">
        <ControlPanel />
        <PlayButton />
        <div>
          <div className="flex flex-col items-center justify-between lg:flex-row">
            <MineCounter />
            <ExposedMines />
          </div>
          {gameField.map((row, rowIndex) => (
            <div className="flex" key={rowIndex}>
              {row.map((cellData, cellIndex) => (
                <Cell
                  key={cellIndex}
                  cellValue={cellData}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                />
              ))}
            </div>
          ))}
        </div>
        <Withdrawal />
      </div>
      {isDesktop && <Logo />}
    </div>
  );
};

export default GameBoard;
