import mazeGeneration from "maze-generation";
import Block from "./Block/block";
import Hero from "./MazeObject/hero";

class Maze {

  constructor(scene, dim) {
    console.log(scene);
    if (typeof dim === 'undefined') {
      console.error("Invalid Maze Parameter");
      return;
    }
    this.dim = dim;
    this.scene = scene;
    this.hero = new Hero(scene, 10, 10);

    const mazeRawData = mazeGeneration({
      width: dim,
      height: dim,
      seed: Math.random() * 1000
    });

    console.log(mazeRawData.toString());
    this.blockData = [];
    for (let i = 0; i < dim; i++) {
      let temp = [];
      for (let j = 0; j < dim; j++) {
        temp.push(new Block(scene, mazeRawData.toJSON().rows[i][j], i, j));
      }
      this.blockData.push(temp);
    }

  }

  renderMaze(isNoWall) {
    this.iterateBlock((i, j) => {
      this.blockData[i][j].renderObject(isNoWall);
    })
    this.hero.renderObject();
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
    console.log("col: ", row, col, direction);
    if (this.blockData[row][col].checkMove(direction)) {
      console.log("valid");
      this.hero.move(direction);
    }
  }

  destory() {
    this.iterateBlock((i, j) => {
      delete this.blockData[i][j];
    });
  }
}

export default Maze;
