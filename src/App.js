import React from "react";
import GameLogic from "./components/GameLogic";
import GameBoard from "./components/GameBoard";
import Logo from "./components/Logo";
import { useMediaQuery } from "react-responsive";
import ControlPanel from "./components/ControlPanel";
import PlayButton from "./components/PlayButton";
import ExposedMines from "./components/ExposedMines";
import MineCounter from "./components/MineCounter";
import Withdrawal from "./components/Withdrawal";


function App() {
  //React Responsive MediaQuery deklariert
  const isDesktop = useMediaQuery({ query: "(min-width: 600px)" });

  return (
    <GameLogic>
      <div className="flex flex-col justify-start items-center min-h-screen bg-green-600 md:flex-row md:justify-center">
          <Logo />
          <div>
            <ControlPanel />
            <PlayButton />
            <div className="flex flex-col items-center justify-between pt-2 lg:flex-row">
              <MineCounter />
              <ExposedMines />
            </div>
            <GameBoard />
            <Withdrawal />
          </div>
          {isDesktop && <Logo />}
      </div>
    </GameLogic>
  );
}

export default App;
