import React, { Suspense, lazy } from "react";
import GameLogic from "./components/GameLogic";
import GameBoard from "./components/GameBoard";
import { useMediaQuery } from "react-responsive";
import ControlPanel from "./components/ControlPanel";
import PlayButton from "./components/PlayButton";
import ExposedMines from "./components/ExposedMines";
import MineCounter from "./components/MineCounter";
import Withdrawal from "./components/Withdrawal";

//Benutzung von Lazy Loading um das laden der Logos zu optimieren 
const Logo = lazy(() => import("./components/Logo"));

function App() {
  
  //React Responsive MediaQuery deklariert
  const isDesktop = useMediaQuery({ query: "(min-width: 600px)" });

  return (
    <GameLogic>
      <Suspense
        fallback={
          <p className="flex justify-center min-h-screen">
            Loading...
          </p>
        }
      >
        <div className="flex flex-col flex-1 justify-start items-center min-h-screen bg-green-600 md:flex-row">
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
      </Suspense>
    </GameLogic>
  );
}

export default App;
