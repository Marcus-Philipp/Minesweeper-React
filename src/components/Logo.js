import React from "react";
import MinesweeperLogo from "../Minesweeper-logo.png";
import { useMediaQuery } from "react-responsive";

const Logo = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

  return isMobile ? (
    <div className="flex w-12 justify-center pb-5">
      <img src={MinesweeperLogo} alt="Minesweeper-Logo" />
      <h1 className="font-bold text-lg bg-gradient-to-r from-red-500 via-red-300 to-red-500 rounded">MINESWEEPER</h1>
      <img src={MinesweeperLogo} alt="Minesweeper-Logo" />
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-2xl bg-gradient-to-r from-red-500 via-red-300 to-red-500 rounded">MINESWEEPER</h1>
      <img src={MinesweeperLogo} alt="Minesweeper-Logo" />
    </div>
  );
};

export default Logo;
