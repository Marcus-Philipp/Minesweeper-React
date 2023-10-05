import React, { useContext } from 'react';
import GameContext from './GameContext';

const Withdrawal = () => {

    const { handleWithdrawal } = useContext(GameContext); //Holt sich die Funktion aus dem Kontext

    return (
        <div>
            <button onClick={handleWithdrawal}>Zurueck</button>
        </div>
    );
};

export default Withdrawal;