import Game from "./src/game/game";

window['DEFAULT_DIM'] = 15;

let game;

let mazeSettings = {
  wallSettings: {
    surface: null,
    isLow: true
  },
  difficulty: null,
  appearance: null,
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

  const wallSurface = document.getElementById('wall_surface');
  const wallHeight = document.getElementById('wall_height');

  const gameStartBtn = document.getElementById("start");

  if (container) {
    game = Game.getInstance(container);

    window.addEventListener('keydown', handleHeroSelection);
    window.addEventListener('keydown', handleGameStartInput);
    window.addEventListener('keydown', handleHeroMoveInput);
  }

  if (tabWrapper) {
    tabWrapper.addEventListener('click', (e) => {
      const id = e.target.dataset.id;

      if (id) {
        for (let dom of tabButtons) {
          dom.classList.remove('active');
        };
        e.target.classList.add('active');;

        if (id === 'hero_setting') {
          game && game.tabSwitch('hero');
        }

        if (id === 'maze_setting') {
          game && game.tabSwitch('maze');
        }
        
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

  if (wallSurface) wallSurface.addEventListener('click', handleWallSurfaceChange);
  if (wallHeight) wallHeight.addEventListener('click', handleWallHeightChange);
}

const handleCameraSwitch = (id) => {
  game && game.switchCamera(id);
}

const handleGameStart = (e) => {
  game && game.startGame();
  document.getElementById("panel").classList.remove('active');;
}

const handleMazeDifficultySelection = (e) => {
  if (e.target && e.target.nodeName.toUpperCase() == "INPUT") {
    mazeSettings.difficulty = e.target.value;
    game && game.settingChange('maze', mazeSettings);
    game && game.settingChange('hero', heroSettings);
  }
}

const handleMazeApperanceSelection = (e) => {
  if (e.target && e.target.nodeName.toUpperCase() == "INPUT") {
    mazeSettings.appearance = e.target.value;
    game && game.settingChange('maze', mazeSettings);
  }
}

const handleHeroShapeChange = (e) => {
  if (e.target && e.target.nodeName.toUpperCase() == "IMG") {
    heroSettings.shape = e.target.id;
    game && game.settingChange('hero', heroSettings);
  }
}

const handleHeroSkinChange = (e) => {
  if (e.target && e.target.nodeName.toUpperCase() == "IMG") {
    heroSettings.skin = e.target.id;
    game && game.settingChange('hero', heroSettings);
  }
}

const handleWallSurfaceChange = (e) => {
  if (e.target && e.target.nodeName.toUpperCase() == "IMG") {
    mazeSettings.wallSettings.surface = e.target.id;
    game && game.settingChange('maze', mazeSettings);
  }
}

const handleWallHeightChange = (e) => {
  if (e.target && e.target.nodeName.toUpperCase() == "INPUT") {
    mazeSettings.wallSettings.isLow = e.target.value === "low";
    console.log("maze sss", mazeSettings)
    game && game.settingChange('maze', mazeSettings);
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
