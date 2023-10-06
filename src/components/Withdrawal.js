import React, { useContext } from 'react';
import GameContext from './GameContext';
import Arrow from '../Removed.png';

const Withdrawal = () => {

    //Holt sich die Funktion aus dem Kontext
    const { handleWithdrawal } = useContext(GameContext);

    return (
        <div>
            <button className="bg-red-500 rounded hover:bg-red-600" onClick={handleWithdrawal}>
                <img className="h-6 w-9 lg:h-9 lg:w-12" src={Arrow} alt="Pfeil zurueck" />
            </button>
        </div>
    );
};

export default Withdrawal;