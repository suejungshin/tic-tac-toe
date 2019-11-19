console.log('Let the game begin!')

// Global variables
let globalVars = {
  numMoves: 0,
  currentPlayer: null,
  boardSize: 3, // 3 x 3 grid
  gameOver: false,
}

// Game position indices are as follows for boardSize 3
// [0, 1, 2,
//  3, 4, 5
//  6, 7, 8]
let board = Array(globalVars.boardSize).fill('');

// Server interaction
const getBoard = () => {
  $.ajax({
    url: 'http://localhost:3000/board',
    type: 'GET',
    success: (data) => {
      board = data.board;
      globalVars = data.globalVars;
      redrawBoardState(board);
    }
  })
}
getBoard();

// Function to determine player
const determinePlayer = function (numMoves) {
  if (numMoves % 2 !== 0) {
    globalVars.currentPlayer = "X";
  } else {
    globalVars.currentPlayer = "O";
  }
}

// Function for a player to make a move
const makeMove = function (squareID) {
  if (globalVars.gameOver) {
    document.getElementById("announcement").innerText = 'Game is over already! Start a new one';
  } else {

    if (board[squareID] === 'X' || board[squareID] === 'O') {
      document.getElementById("announcement").innerText = "Invalid move, that square is already taken";
      return;
    }
    globalVars.numMoves++;
    determinePlayer(globalVars.numMoves);
    document.getElementById(squareID).innerText = globalVars.currentPlayer;
    board[squareID] = globalVars.currentPlayer;

    if (winnerFound(board)) {
      globalVars.gameOver = true;
      document.getElementById("announcement").innerText = `We have a winner!! It is ${globalVars.currentPlayer}`;
      document.getElementById("announcement").setAttribute("style", "background-color: yellow");
    }
    if (globalVars.numMoves >= (globalVars.boardSize * globalVars.boardSize) && globalVars.gameOver === false) {
      document.getElementById("announcement").innerText = "Game over, there is no winner!";
    }
  }

}

// Create the board
let boardDiv = document.createElement("div");
boardDiv.className = "board";
boardDiv.id = "board";
document.getElementById("app").append(boardDiv);


// Create the squares
for (let i = 0; i < (globalVars.boardSize * globalVars.boardSize); i++) {
  let square = document.createElement("div");
  square.className = "square";
  square.id = i;
  square.addEventListener("click", makeMove.bind(null, square.id));
  document.getElementById("board").append(square);
}

// Reset the DOM based on board contents
const redrawBoardState = (board) => {
  for (let i = 0; i < board.length; i++) {
    document.getElementById(i).innerText = board[i];
  }
}


// Restart the game
const restartGame = function () {
  globalVars.numMoves = 0;
  board = Array(globalVars.boardSize * globalVars.boardSize).fill("");
  for (let i = 0; i < globalVars.boardSize * globalVars.boardSize; i++) {
    document.getElementById(i).innerText = '';
  }
  globalVars.gameOver = false;
  document.getElementById("announcement").innerText = "New game woo!";
  document.getElementById("announcement").setAttribute("style", "background-color: white");
}

// Click handler for restart
document.getElementById("start-over").addEventListener("click", restartGame);


// Check if there is a winner for the current board state
let winnerFound = function (board) {
  let possibleToWin = (globalVars.currentPlayer === "X" && globalVars.numMoves >= globalVars.boardSize * 2 - 1) || (globalVars.currentPlayer === "O" && globalVars.numMoves >= globalVars.boardSize * 2);
  if (possibleToWin) {
    return checkRows(board, globalVars.currentPlayer) || checkCols(board, globalVars.currentPlayer) || checkDiags(board, globalVars.currentPlayer);
  }
  return false;
}

// The below checks need to be improved because they are not DRY
let checkRows = function (board, currentPlayer) {
  let counter = 0;
  for (let i = 0; i < globalVars.boardSize * globalVars.boardSize; i = i + globalVars.boardSize) {
    let rowStart = i;
    for (let j = rowStart; j < rowStart + globalVars.boardSize; j++) {
      if (board[j] === currentPlayer) {
        counter++;
      }
    }
    if (counter === globalVars.boardSize) {
      return true;
    }
    counter = 0;
  }
};

let checkCols = function (board, currentPlayer) {
  let counter = 0;
  for (let i = 0; i < globalVars.boardSize; i++) {
    let colStart = i;
    for (let j = colStart; j < globalVars.boardSize * globalVars.boardSize; j = j + globalVars.boardSize) {
      if (board[j] === currentPlayer) {
        counter++;
      }
    }
    if (counter === globalVars.boardSize) {
      return true;
    }
    counter = 0;
  }
};

// The below checks need to be fixed, it shouldn't include hard coded references
let checkDiags = function (board, currentPlayer) {

  if ((board[0] === board[4] && board[0] === board[8] && board[0] === currentPlayer) || (board[2] === board[4] && board[2] === board[6] && board[2] === currentPlayer)) { // need this to be dynamic based on board size
    return true;
  }
};
