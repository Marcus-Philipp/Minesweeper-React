import GameLogic from './components/GameLogic';
import GameBoard from './components/GameBoard';

function App() {
  return (
    <div>
      <GameLogic>
        <GameBoard />
      </GameLogic>
    </div>
  );
}

export default App;
