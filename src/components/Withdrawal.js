import React, { useContext } from 'react';
import GameContext from './GameContext';

const Withdrawal = () => {

    const { handleWithdrawal } = useContext(GameContext);
    
    return (
        <div>
            <button onClick={handleWithdrawal}>Zurueck</button>
        </div>
    );
};

export default Withdrawal;