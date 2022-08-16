import mazeGeneration from "maze-generation";
import { meshCreator } from "../../utils/threeBasicsCreator";
import geometryCreator from "../../utils/threeGeometryCreator";
import { materialCreator } from "../../utils/threeUtilsCreator";
import getHeroConfig from "../consts/heroConfig";
import getMazeConfig from "../consts/mazeConfig";
import Hero from "../hero";
import Floor from "./floor";

class Maze {

  constructor(scene, mazeConfig) {
    this.hero = null;
    this.cover = null;
    this.scene = scene;
    this.initMaze(mazeConfig);
  }

  initHero(heroConfig) {
    console.log("heroconfig: ", heroConfig);
    let scene = this.scene;
    let dim = this.dim;
    function _genHero() {
      let hero = new Hero(scene, getHeroConfig(dim, heroConfig || {}));
      return hero;
    }
    this.hero.destroyObject();
    this.hero = _genHero();
  }

  initMaze(mazeConfig, heroConfig) {
    console.log("config: ", heroConfig);
    const { dim, floorTexture } = getMazeConfig(mazeConfig);
    let scene = this.scene;

    function _genHero() {
      let hero = new Hero(scene, getHeroConfig(dim, heroConfig || {}));
      return hero;
    }

    function _genFloorData() {
      let floorData = [];
      for (let i = 0; i < dim; i++) {
        let temp = [];
        for (let j = 0; j < dim; j++) {
          let floor = new Floor(scene, { row: i, col: j });
          temp.push(floor);
        }
        floorData.push(temp);
      }
      return floorData;
    }

    function _genFloorCover() {
      let coverGeo = geometryCreator('block', {
        boxWidth: dim,
        boxHeight: 0.1,
        boxDepth: dim
      })

      let coverMaterial = materialCreator('texture', floorTexture)
      let cover = meshCreator(coverGeo, coverMaterial);
      cover.position.x = (dim - 1) / 2;
      cover.position.y = 0.01;
      cover.position.z = (dim - 1) / 2;
      scene.add(cover);

      return cover;
    }

    this.destroyMaze();

    this.hero = _genHero();
    this.floorData = _genFloorData();
    this.floorCover = _genFloorCover();

    this.dim = dim || 10;
  }

  destroyMaze() {
    this.iterateFloor((i, j) => {
      this.floorData[i][j].destroyObject();
    })

    this.hero?.destroyObject();

    this.scene.remove(this.floorCover);
    delete this.floorCover;
    this.floorData = null;

    this.hero = null;
  }


  initGame() {
    // this.gameStatus = 'Game Begin';

    let coinsCount = this.coinsCount;
    let monsterCount = this.monsterCount; 
    let dim = this.dim;
    let blockData = this.floorData;

    const mazeRawData = mazeGeneration({
      width: this.dim,
      height: this.dim,
      seed: Math.random() * 1000
    });

    function _genCoin() {
      let i = 0;
      while (i < coinsCount) {
        let row = Math.floor(Math.random() * (dim - 1));
        let col = Math.floor(Math.random() * (dim - 1));
        if (blockData[row][col].genObject('coin')) i++;
      };
    }

    function _genMonster() {
      let i = 0;
      while (i < monsterCount) {
        let row = Math.floor(Math.random() * (dim - 1));
        let col = Math.floor(Math.random() * (dim - 1));
        if (blockData[row][col].genObject('monster')) i++;
      };
    }

    // this.hero.generateObject(getHeroConfig(1, this.gameStatus));
    this.iterateFloor((i, j) => {
      this.floorData[i][j].genWalls(mazeRawData.toJSON().rows[i][j]);
    })
    _genCoin();
    _genMonster();
  }

  renderObject(time) {
    this.iterateFloor((i, j) => {
      this.floorData[i][j].renderObject(time);
    })
    this.hero.renderObject(time);
  }

  iterateFloor(cb) {
    for (let i = 0; i < this.dim; i++) {
      for (let j = 0; j < this.dim; j++) {
        cb(i, j);
      }
    }
  }

  moveHero(direction) {
    const { row, col } = this.hero.getLocation();
    if (this.floorData[row][col].checkMove(direction)) {
      this.floorData[row][col].tryMoveHero(this.hero);
      this.hero.move(direction);
      return true;
    };
    return false
  }
  

  destory() {
    this.iterateFloor((i, j) => {
      delete this.floorData[i][j];
    }); 
  }
}

export default Maze;
