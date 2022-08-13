const mazeGeneration = require("maze-generation");

const generateMaze = (height, width) => {
  const options = {
    width,
    height,
    seed: Math.random() * 100
  }


  // const parseMaze = (mazeJSON) => {
  //   for (let i = 0; i < height; i++) {
  //     for (let j = 0; j < width; j++) {
  //       console.log(mazeJSON.rows[i][j]);
  //     }
  //   }
  // }

  let mazeData = mazeGeneration(options).toJSON();
  return mazeData;
}

export default generateMaze;