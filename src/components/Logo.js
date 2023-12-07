import React, { useEffect, useState } from "react";
import MinesweeperLogo from "../Minesweeper-logo.png";
import { useMediaQuery } from "react-responsive";

const Logo = () => {
  //React Responsive MediaQuery deklariert
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
     const img = new Image();
     img.src = MinesweeperLogo;

     img.onload = () => {
      setIsLoading(false);
     }
  }, []);

  if(isLoading) {
    return <p className="invisible">Loading...</p>
  }

  return isMobile ? (
    <div className="flex w-12 justify-center pb-5">
      <img src={MinesweeperLogo} alt="Minesweeper-Logo" />
      <h1 className="font-bold text-lg bg-gradient-to-r from-red-500 via-red-300 to-red-500 rounded">
        MINESWEEPER
      </h1>
      <img src={MinesweeperLogo} alt="Minesweeper-Logo" />
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-2xl bg-gradient-to-r from-red-500 via-red-300 to-red-500 rounded">
        MINESWEEPER
      </h1>
      <img src={MinesweeperLogo} alt="Minesweeper-Logo" />
    </div>
  );
};

export default Logo;
