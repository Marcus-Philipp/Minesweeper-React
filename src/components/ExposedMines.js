import React, { useContext } from "react";
import GameContext from "./GameContext";
import Mine from "../mine-icon.png";

const ExposedMines = () => {
  //Holt sich die Anzahl der aufgedeckten Minen aus dem Kontext
  const { countedMines } = useContext(GameContext);

  return (
    <div className="flex">
      <span>{countedMines}</span>
      <img className="w-7 h-7" src={Mine} alt="MinenIcon" />
      Aufgedeckt
    </div>
  );
};

export default ExposedMines;
