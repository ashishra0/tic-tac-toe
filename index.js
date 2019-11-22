var origBoard;
var huPlayer = 'Ω';
var aiPlayer = 'O';
var winCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [2,4,6],
];

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
  document.querySelector('.endgame').style.display = "none";
  origBoard = [0,1,2,3,4,5,6,7,8];
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click', turnClick, false);
  }
}

function turnClick(event) {
  if (typeof origBoard[event.target.id] == 'number') {
    turn(event.target.id, huPlayer);
    if (!checkWin(origBoard, huPlayer) && !checkTie()) turn(bestSpot(), aiPlayer);
  }
}

function turn(id, player) {
  origBoard[id] = player;
  document.getElementById(id).innerText = player;
  let gameWon = checkWin(origBoard, player);
  if (gameWon) gameOver(gameWon);
}

function checkWin(board, player) {
  let plays = board.reduce((a, e, i) => 
  (e === player) ? a.concat(i) : a, []);
  let gameWon = null;
  for (let[index, win] of winCombos.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      gameWon = {index: index, player: player}
      break;
    };
  }
  return gameWon;
}

function gameOver(gameWon) {
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor = gameWon.player == huPlayer ? "blue" : "red";
  }
  for (var i = 0; i < cells.length; i++) {
    cells[i].removeEventListener('click', turnClick, false)
  }
  declareWinner(gameWon.player == huPlayer ? "You Won" : "You lose");
}

function declareWinner(who) {
  document.querySelector(".endgame").style.display = 'block';
  document.querySelector(".endgame .text").innerText = who;
}

function emptySpot() {
  return origBoard.filter(e => typeof e === 'number');
}

function bestSpot() {
  return emptySpot()[0];
}

function checkTie() {
  if (emptySpot().length === 0) {
    for (var i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = 'green';
      cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner("Its a tie");
    return true;
  }
  return false;
}