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

  let maze = mazeGeneration(options)
  // console.log(maze.toString());
  parseMaze(maze.toJSON());
  // console.log(maze.toJSON());
}


generateMaze(5, 5);