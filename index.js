import Game from "./src/game/game";

function onDrag(element, x, y) {
  
}

let game;

window.onload = () => {
  const container = document.getElementById("container");
  const panel = document.getElementById("panel");
  new Draggable(panel, onDrag);

  const gameStartBtn = document.getElementById("start");
  const cameraTwo = document.getElementById("cameraTwo");

  if (container) {
    game = Game.getInstance({
      container,
      dim: 19
    });

    window.addEventListener('keydown', handleHeroSelection);
    window.addEventListener('keydown', handleGameStartInput);
    window.addEventListener('keydown', handleHeroMoveInput);
  }

  if (gameStartBtn) {
    gameStartBtn.addEventListener('click', handleGameStart);
  }

  if (cameraTwo) {
    cameraTwo.addEventListener('click', () => handleCameraSwitch(2));
  }
}

const handleCameraSwitch = (id) => {
  game && game.switchCamera(id);
}

const handleGameStart = (e) => {
  game && game.initGame();
}

const handleHeroMoveInput = (e) => {
  if (e.key && e.code === 'KeyW') {
    game.moveHero('up');
  } else if (e.key && e.code === 'KeyS') {
    game.moveHero('down');
  } else if (e.key && e.code === 'KeyA') {
    game.moveHero('left');
  } else if (e.key && e.code === 'KeyD') {
    game.moveHero('right');
  }
}

const handleGameStartInput = (e) => {
  if (e.key && e.code === 'KeyR') {
    game && game.initGame();
  }
}

const handleHeroSelection = (e) => {
  if (e.key && e.code === 'ArrowLeft') {
    game && game.changeHero(false);
  } else if (e.key && e.code === 'ArrowRight') {
    game && game.changeHero(true);
  }
}
