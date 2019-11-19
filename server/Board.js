
const globalVars = {
  numMoves: 0,
  currentPlayer: null,
  boardSize: 3, // 3 x 3 grid
  gameOver: false,
}

const board = Array(globalVars.boardSize).fill('');

module.exports = {
  board: board,
  globalVars: globalVars,
};