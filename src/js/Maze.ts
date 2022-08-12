

class Maze {

  /**
   * @description Maze Row Length
   */
  private height: number;
  /**
   * @description Maze Column Length
   */
  private width: number;

  static instance: Maze;

  static DEAFULT_HEIGHT = 20;
  static DEAFULT_WIDTH = 20;

  constructor(height: number = Maze.DEAFULT_HEIGHT, width: number = Maze.DEAFULT_WIDTH) {
    this.height = Math.min(height, 3000);
    this.width = Math.min(width, 3000);
    
  }




  static getInstance(height, width) {
    if (!Maze.instance) Maze.instance = new Maze(height, width);
    else return Maze.instance;
  }

}
