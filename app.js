console.log('Let the game begin!')

// Global variables
let numMoves = 0;
let currentPlayer;

// Game position indices are as follows:
// [0, 1, 2,
//  3, 4, 5
//  6, 7, 8]
let gamePositions = {
  Xpositions: [],
  Opositions: []
}

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

  if (gamePositions.Xpositions.includes(squareID * 1) || gamePositions.Opositions.includes(squareID * 1)) {
    alert("Invalid move, that square is already taken");
    return;
  }

  numMoves++;
  determinePlayer(numMoves);
  document.getElementById(squareID).innerText = currentPlayer;

  let playerPositionArray = gamePositions[`${currentPlayer}positions`];
  playerPositionArray.push(squareID * 1);

  if (determineWinner(playerPositionArray)) {
    alert(`We have a winner!! It is ${currentPlayer}`);
  }

}

// Create the board
let board = document.createElement("div");
board.className = "board";
board.id = "board";
document.getElementById("app").append(board);

// Create the squares
let boardSize = 3;
for (let i = 0; i < (boardSize * boardSize); i++) {
  let square = document.createElement("div");
  square.className = "square";
  square.id = i;
  square.addEventListener("click", makeMove.bind(null, square.id));
  document.getElementById("board").append(square);
}


// Determine winner
let determineWinner = function(positionsArray) {
  let sumOfPositions = positionsArray.reduce((accumulator, currentValue)=> {
    return accumulator + currentValue;
  })

  let possibleToWin = (currentPlayer === "X" && numMoves >= 5) || (currentPlayer === "O" && numMoves >= 6);

  return possibleToWin && sumOfPositions % 3 === 0;

}

