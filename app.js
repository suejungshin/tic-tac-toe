console.log('Let the game begin!')

// Global variables
let numMoves = 0;
let currentPlayer;
let boardSize = 3; // 3 x 3 grid
let gameOver = false;

// Game position indices are as follows:
// [0, 1, 2,
//  3, 4, 5
//  6, 7, 8]

let board = ['', '', '',
  '', '', '',
  '', '', ''];

// Function to determine player
const determinePlayer = function (numMoves) {
  if (numMoves % 2 !== 0) {
    currentPlayer = "X";
  } else {
    currentPlayer = "O";
  }
}

// Function for a player to make a move
const makeMove = function (squareID) {
  if (board[squareID] !== '') {
    alert("Invalid move, that square is already taken");
    return;
  }

  numMoves++;
  determinePlayer(numMoves);
  document.getElementById(squareID).innerText = currentPlayer;
  board[squareID] = currentPlayer;

  if (winnerFound(board)) {
    alert(`We have a winner!! It is ${currentPlayer}`);
    gameOver = true;
  }

  if (numMoves >= 9 && gameOver === false) {
    alert('Game over, there is no winner!');
  }

}

// Create the board
let boardDiv = document.createElement("div");
boardDiv.className = "board";
boardDiv.id = "board";
document.getElementById("app").append(boardDiv);

// Create the squares

for (let i = 0; i < (boardSize * boardSize); i++) {
  let square = document.createElement("div");
  square.className = "square";
  square.id = i;
  square.addEventListener("click", makeMove.bind(null, square.id));
  document.getElementById("board").append(square);
}


// Restart the game
const restartGame = function() {
  numMoves = 0;
  board = ['', '', '',
  '', '', '',
  '', '', ''];
  for (let i = 0; i < boardSize * boardSize; i++) {
    document.getElementById(i).innerText = '';
  }
}

// Allow for restart
document.getElementById("start-over").addEventListener("click", restartGame);


// Check if there is a winner for the current board state
let winnerFound = function (board) {
  let possibleToWin = (currentPlayer === "X" && numMoves >= 5) || (currentPlayer === "O" && numMoves >= 6);
  if (possibleToWin) {
    return checkRows(board, currentPlayer) || checkCols(board, currentPlayer) || checkDiags(board, currentPlayer);
  }
  return false;
}

// The below checks need to be improved because they are not DRY
let checkRows = function (board, currentPlayer) {
  let startingIndices = [0, 3, 6]; // need to fix this to be dynamic based on boardsize
  let counter = 0;
  for (let i = 0; i < startingIndices.length; i++) {
    let rowStart = startingIndices[i];
    for (let j = rowStart; j < rowStart + boardSize; j++) {
      if (board[j] === currentPlayer) {
        counter++;
      }
    }
    if (counter === boardSize) {
      return true;
    }
    counter = 0;
  }
};

let checkCols = function (board, currentPlayer) {
  let startingIndices = [0, 1, 2]; // need to fix this to be dynamic based on boardsize
  let counter = 0;
  for (let i = 0; i < startingIndices.length; i++) {
    let colStart = startingIndices[i];
    for (let j = colStart; j < boardSize * boardSize; j = j + boardSize) {
      if (board[j] === currentPlayer) {
        counter++;
      }
    }
    if (counter === boardSize) {
      return true;
    }
    counter = 0;
  }
};

// The below checks need to be fixed, it shouldn't include hard coded references
let checkDiags = function (board, currentPlayer) {
  if ((board[0] === board[4] && board[0] === board[8] && board[0] === currentPlayer) ||(board[2] === board[4] && board[2] === board[6] && board[2] === currentPlayer)) { // need this to be dynamic based on board size
    return true;
  }
};
