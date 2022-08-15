import mazeGeneration from "maze-generation";
import Block from "./block";

class Maze {

  constructor(scene, dim) {
    if (typeof dim === 'undefined') {
      console.error("Invalid Maze Parameter");
      return;
    }
    this.dim = dim;
    this.coinsCount = dim;
    this.monsterCount = dim / 2;
    this.scene = scene;
    this.blockData = [];
    for (let i = 0; i < dim; i++) {
      let temp = [];
      for (let j = 0; j < dim; j++) {
        temp.push(new Block(scene, {
          row: i,
          col: j
        }));
      }
      this.blockData.push(temp);
    }

    console.log(this.blockData);
  }

  genMaze(mazeConfig) {
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
  }

  iterateBlock(cb) {
    for (let i = 0; i < this.dim; i++) {
      for (let j = 0; j < this.dim; j++) {
        cb(i, j);
      }
    }
  }

  checkMove(direction, location) {
    console.log(location);
    const { row, col } = location;
    return this.blockData[row][col].checkMove(direction);
  }
  

  destory() {
    this.iterateBlock((i, j) => {
      delete this.blockData[i][j];
    }); 
  }
}

export default Maze;
