import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import Log from "./components/Log";

import WINNING_COMBINATIONS from './winnig-combinations';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivingCurrentPlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}


function App() {
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const [gameTurns, setGameTurns] = useState([]);
  let winner;
  const draw = gameTurns.length === 9 && !winner;

  const activePlayer = derivingCurrentPlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if (firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) {
      winner = players[firstSquare];
    }

  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const currentPlayer = derivingCurrentPlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns];

      return updatedTurns;
    });
  }

  function handleReset() {
    setGameTurns([]);
  }

  function handlePlayersNameChane(symbol, newName) {
    setPlayers(prevName => {
      return {
        ...prevName,
        [symbol]: newName
      }
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} onPlayerNameChange={handlePlayersNameChane}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} onPlayerNameChange={handlePlayersNameChane}/>
        </ol>
        {(winner || draw) && <GameOver winner={winner} onReset={handleReset} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
