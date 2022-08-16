import Game from "./src/game/game";

let game;

let mazeSettings = {
  difficulty: null,
  appearance: null
}

window.onload = () => {
  const container = document.getElementById("container");
  const panel = document.getElementById("panel");


  const mazeDifficulty = document.getElementById('maze_difficulty');
  const mazeApperance = document.getElementById('maze_apperance');


  const gameStartBtn = document.getElementById("start");
  // const cameraTwo = document.getElementById("cameraTwo");

  if (container) {
    game = Game.getInstance({ container });

    window.addEventListener('keydown', handleHeroSelection);
    window.addEventListener('keydown', handleGameStartInput);
    window.addEventListener('keydown', handleHeroMoveInput);
  }


  if (gameStartBtn) gameStartBtn.addEventListener('click', handleGameStart);

  if (mazeDifficulty) mazeDifficulty.addEventListener('change', handleMazeDifficultySelection);
  if (mazeApperance) mazeApperance.addEventListener('change', handleMazeApperanceSelection);
}

const handleCameraSwitch = (id) => {
  game && game.switchCamera(id);
}

const handleGameStart = (e) => {
  game && game.initGame();
}

const handleMazeDifficultySelection = (e) => {
  if (e.target && e.target.nodeName.toUpperCase() == "INPUT") {
    mazeSettings.difficulty = e.target.value;
    game && game.changeMazeSetting(mazeSettings);
  }
}

const handleMazeApperanceSelection = (e) => {
  if (e.target && e.target.nodeName.toUpperCase() == "INPUT") {
    mazeSettings.appearance = e.target.value;
    game && game.changeMazeSetting(mazeSettings);
  }
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
