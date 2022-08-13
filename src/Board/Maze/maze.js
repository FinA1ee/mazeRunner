import mazeGeneration from "maze-generation";
import Block from "./Block/block";

class Maze {

  constructor(scene, dim) {
    if (typeof dim === 'undefined') {
      console.error("Invalid Maze Parameter");
      return;
    }
    this.dim = dim;
    this.scene = scene;

    const mazeRawData = mazeGeneration({
      width: dim,
      height: dim,
      seed: Math.random * 1000
    }).toJSON().rows;

    console.log(mazeRawData);
    this.blockData = [];
    for (let i = 0; i < dim; i++) {
      let temp = [];
      for (let j = 0; j < dim; j++) {
        temp.push(new Block(scene, mazeRawData[i][j], i, j));
      }
      this.blockData.push(temp);
    }


  }

  renderMaze() {
    this.iterateBlock((i, j) => {
      this.blockData[i][j].renderObject();
    })
  }

  iterateBlock(cb) {
    for (let i = 0; i < this.dim; i++) {
      for (let j = 0; j < this.dim; j++) {
        cb(i, j);
      }
    }
  }
}

export default Maze;
