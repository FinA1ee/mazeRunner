import Board from "./src/Board/board";


let board;

window.onload = () => {
  const container = document.getElementById("container");

  const gameStartBtn = document.getElementById("start");

  if (container) {
    board = Board.getInstance({
      container,
      dim: 10
    });
  }

  if (board && gameStartBtn) {
    gameStartBtn.addEventListener('click', handleGameStart);
  }

}

const handleGameStart = (e) => {
  board.initGame();
}

const handleKeyInput = (e) => {
  console.log(e)
  if (e.key && e.code === 'ArrowUp') {
    board.moveHero('up');
  } else if (e.key && e.code === 'ArrowDown') {
    board.moveHero('down');
  } else if (e.key && e.code === 'ArrowLeft') {
    board.moveHero('left');
  } else if (e.key && e.code === 'ArrowRight') {
    board.moveHero('right');
  }
}


window.addEventListener('keydown', handleKeyInput);