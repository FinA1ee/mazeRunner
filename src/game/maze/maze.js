import mazeGeneration from "maze-generation";
import { meshCreator } from "../../utils/threeBasicsCreator";
import geometryCreator from "../../utils/threeGeometryCreator";
import { materialCreator } from "../../utils/threeUtilsCreator";
import getMazeConfig from "../consts/mazeConfig";
import Floor from "./floor";

class Maze {

  constructor(scene) {
    this.cover = null;
    this.scene = scene;
    this.generateObject();
  }

  generateObject(settings = {}) {

    const { wallSettings, ...mazeSettings } = settings
    this.wallSettings = wallSettings;

    const { dim, floorTexture } = getMazeConfig(mazeSettings);
    let scene = this.scene;

    function _genFloorData() {
      let floorData = [];
      for (let i = 0; i < dim; i++) {
        let temp = [];
        for (let j = 0; j < dim; j++) {
          let floor = new Floor(scene, { row: i, col: j });
          temp.push(floor);
          if (i === 0 && j === 0) floor.genWalls({ up: true, left: true }, wallSettings);
          else if (i === dim - 1 && j === dim - 1) floor.genWalls({ down: true, right: true }, wallSettings);
          else if (i === dim - 1 && j === 0) floor.genWalls({ down: true, left: true }, wallSettings);
          else if (i === 0 && j === dim - 1) floor.genWalls({ up: true, right: true }, wallSettings);
          else if (i === 0) floor.genWalls({ up: true }, wallSettings);
          else if (j === 0) floor.genWalls({ left: true }, wallSettings);
          else if (i === dim - 1) floor.genWalls({ down: true }, wallSettings);
          else if (j === dim - 1) floor.genWalls({ right: true }, wallSettings);
        }
        floorData.push(temp);
      }
      return floorData;
    }

    function _genFloorCover() {
      let coverGeo = geometryCreator('block', {
        width: dim,
        height: 0.1,
        depth: dim
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
    this.floorData = _genFloorData();
    this.floorCover = _genFloorCover();

    window["DEFAULT_DIM"] = dim;
    // this.dim = dim || 10;
  }

  destroyMaze() {
    this.floorData && this.iterateFloor((i, j) => {
      this.floorData[i][j].destroyObject();
    })

    this.scene.remove(this.floorCover);
    delete this.floorCover;
    this.floorData = null;
  }


  initGame() {
    // this.gameStatus = 'Game Begin';

    let dim = window["DEFAULT_DIM"];
    let coinsCount = this.coinsCount;
    let monsterCount = this.monsterCount; 
    let blockData = this.floorData;

    const mazeRawData = mazeGeneration({
      width: dim,
      height: dim,
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
      this.floorData[i][j].genWalls(mazeRawData.toJSON().rows[i][j], this.wallSettings);
    })
    _genCoin();
    _genMonster();
  }

  renderObject(time) {
    this.iterateFloor((i, j) => {
      this.floorData[i][j].renderObject(time);
    })
  }

  iterateFloor(cb) {
    const dim = window["DEFAULT_DIM"] || 15;
    for (let i = 0; i < dim; i++) {
      for (let j = 0; j < dim; j++) {
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
