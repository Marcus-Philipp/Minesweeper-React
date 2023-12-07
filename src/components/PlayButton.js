import React, { useContext } from 'react';
import GameContext from './GameContext';
import Button from '../play.png';

const PlayButton = () => {
    
    //Holt sich Funktion aus dem Kontext
    const { resetGame } = useContext(GameContext);
    
    return (
        <div className="flex items-center justify-center">
            <button className="h-12 w-12" onClick={() => resetGame()}>
                <img src={Button} alt="Playbutton" />
            </button>
        </div>
    );
};

export default PlayButton;