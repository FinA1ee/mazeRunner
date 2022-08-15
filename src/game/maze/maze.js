import mazeGeneration from "maze-generation";
import Block from "./block";

class Maze {

  constructor(scene, dim) {
    if (typeof dim === 'undefined') {
      console.error("Invalid Maze Parameter");
      return;
    }
    this.dim = dim;
    this.scene = scene;
    
    this.blockData = [];
    for (let i = 0; i < dim; i++) {
      let temp = [];
      for (let j = 0; j < dim; j++) {
        temp.push(new Block(scene, i, j));
      }
      this.blockData.push(temp);
    }

  }

  generateMaze() {
    const mazeRawData = mazeGeneration({
      width: this.dim,
      height: this.dim,
      seed: Math.random() * 1000
    });

    this.iterateBlock((i, j) => {
      this.blockData[i][j].renderWalls(mazeRawData.toJSON().rows[i][j]);
    })
  }

  renderObject() {
    this.iterateBlock((i, j) => {
      this.blockData[i][j].renderObject();
    })
  }

  renderWalls() {
    this.iterateBlock((i, j) => {
      this.blockData[i][j].renderWalls();
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
