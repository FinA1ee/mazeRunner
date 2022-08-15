import mazeGeneration from "maze-generation";
import getHeroConfig from "../consts/heroConfig";
import Hero from "../hero";
import Block from "./block";

class Maze {

  constructor(scene, dim, mazeConfig) {
    if (typeof dim === 'undefined') {
      console.error("Invalid Maze Parameter");
      return;
    }
    this.dim = dim;
    this.coinsCount = dim / 2;
    this.monsterCount = dim / 4;
    this.gameStatus = 'Hero Selection';
    this.hero = new Hero(scene, getHeroConfig(1, this.gameStatus));
    this.scene = scene;

    this._genBlockData();
  }

  _genBlockData() {
    this.blockData = [];
    for (let i = 0; i < this.dim; i++) {
      let temp = [];
      for (let j = 0; j < this.dim; j++) {
        let block = new Block(this.scene, { row: i, col: j });
        temp.push(block);
      }
      this.blockData.push(temp);
    }
  }

  initMaze() {
    this.gameStatus = 'Game Begin';

    let coinsCount = this.coinsCount;
    let monsterCount = this.monsterCount; 
    let dim = this.dim;
    let blockData = this.blockData;

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

    this.hero.generateObject(getHeroConfig(1, this.gameStatus));
    this.iterateBlock((i, j) => {
      this.blockData[i][j].genWalls(mazeRawData.toJSON().rows[i][j]);
    })
    _genCoin();
    _genMonster();
  }

  renderObject(time) {
    this.iterateBlock((i, j) => {
      this.blockData[i][j].renderObject(time);
    })
    if (this.gameStatus === 'Hero Selection') this.hero.renderObject(time);
  }

  iterateBlock(cb) {
    for (let i = 0; i < this.dim; i++) {
      for (let j = 0; j < this.dim; j++) {
        cb(i, j);
      }
    }
  }

  moveHero(direction) {
    const { row, col } = this.hero.getLocation();
    if (this.blockData[row][col].checkMove(direction)) {
      this.blockData[row][col].tryMoveHero(this.hero);
      this.hero.move(direction);
      return true;
    };
    return false
  }
  

  destory() {
    this.iterateBlock((i, j) => {
      delete this.blockData[i][j];
    }); 
  }
}

export default Maze;
