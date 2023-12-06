import React, { useContext } from "react";
import GameContext from "./GameContext";
import Cell from "./Cell";

const GameBoard = () => {
  //Holt sich das Spielfeld aus dem Kontext
  const { gameField } = useContext(GameContext);

  return (
    <div>
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
  );
};

export default GameBoard;
