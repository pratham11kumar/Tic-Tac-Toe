import { useState } from "react";
import Board from "./components/Board";
import "./App.css";

function App() {

  const [board, setBoard] = useState(
    Array(9).fill(null)
  );

  const [isXTurn, setIsXTurn] =
    useState(true);

  const winnerData =
    calculateWinner(board);

  const winner =
    winnerData?.winner;

  const winningCells =
    winnerData?.line || [];

  const draw =
    !winner &&
    board.every(
      (cell)=>cell
    );

  function handleClick(index){

    if(
      board[index] ||
      winner
    ) return;

    const updatedBoard =
      [...board];

    updatedBoard[index] =
      isXTurn ? "X" : "O";

    setBoard(updatedBoard);

    setIsXTurn(
      !isXTurn
    );

  }

  function resetGame(){

    setBoard(
      Array(9).fill(null)
    );

    setIsXTurn(true);

  }

  let status;

  if(winner){

    status =
      `Winner : ${winner}`;

  }

  else if(draw){

    status =
      "Game Draw";

  }

  else{

    status =
      `Turn : ${
        isXTurn ? "X" : "O"
      }`;

  }

  return(

    <div className="container">

      <h1>
        Tic Tac Toe
      </h1>

      <p className="status">
        {status}
      </p>

      <Board
        board={board}
        handleClick={
          handleClick
        }
        winningCells={
          winningCells
        }
      />

      <button
        className="reset"
        onClick={
          resetGame
        }
      >
        Reset Game
      </button>

    </div>

  );

}

function calculateWinner(board){

const patterns = [

[0,1,2],
[3,4,5],
[6,7,8],

[0,3,6],
[1,4,7],
[2,5,8],

[0,4,8],
[2,4,6]

];

for(let line of patterns){

const [a,b,c]=line;

if(

board[a] &&

board[a]===board[b] &&

board[a]===board[c]

){

return{

winner:board[a],

line

};

}

}

return null;

}

export default App;