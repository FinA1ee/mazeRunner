import Game from "./src/game/game";

let game;

let mazeSettings = {
  difficulty: null,
  appearance: null
}

let heroSettings = {
  shape: null,
  skin: null
}

window.onload = () => {
  const container = document.getElementById("container");
  const panel = document.getElementById("panel");

  const tabWrapper = document.getElementById('tabButtonWrapper');
  const tabButtons = document.getElementsByClassName('tab-button');
  const contents = document.getElementsByClassName('content');

  const mazeDifficulty = document.getElementById('maze_difficulty');
  const mazeApperance = document.getElementById('maze_apperance');

  const heroShape = document.getElementById('hero_shape');
  const heroSkin = document.getElementById('hero_skin');

  const gameStartBtn = document.getElementById("start");

  if (container) {
    game = Game.getInstance({ container });

    window.addEventListener('keydown', handleHeroSelection);
    window.addEventListener('keydown', handleGameStartInput);
    window.addEventListener('keydown', handleHeroMoveInput);
  }

  if (tabWrapper) {
    tabWrapper.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      console.log("id:", id);
      if (id) {
        for (let dom of tabButtons) {
          dom.classList.remove('active');
        };
        e.target.classList.add('active');
        
        for (let dom of contents) {
          dom.classList.remove('active');
        }
        const ele = document.getElementById(id);
        ele.classList.add('active');
      }
    })
  };
  

  if (gameStartBtn) gameStartBtn.addEventListener('click', handleGameStart);

  if (mazeDifficulty) mazeDifficulty.addEventListener('change', handleMazeDifficultySelection);
  if (mazeApperance) mazeApperance.addEventListener('change', handleMazeApperanceSelection);

  if (heroShape) heroShape.addEventListener('click', handleHeroShapeChange);
  if (heroSkin) heroSkin.addEventListener('click', handleHeroSkinChange);
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
    game && game.changeMazeSetting(mazeSettings, heroSettings);
  }
}

const handleMazeApperanceSelection = (e) => {
  if (e.target && e.target.nodeName.toUpperCase() == "INPUT") {
    mazeSettings.appearance = e.target.value;
    game && game.changeMazeSetting(mazeSettings, heroSettings);
  }
}

const handleHeroShapeChange = (e) => {
  if (e.target && e.target.nodeName.toUpperCase() == "IMG") {
    heroSettings.shape = e.target.id;
    game && game.changeHeroSetting(heroSettings);
  }
}

const handleHeroSkinChange = (e) => {
  if (e.target && e.target.nodeName.toUpperCase() == "IMG") {
    heroSettings.skin = e.target.id;
    game && game.changeHeroSetting(heroSettings);
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
