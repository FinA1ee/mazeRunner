import MazeObject from '../MazeObject/mazeObject';
import * as Three from 'three';
import geometryCreator from '../../../utils/threeGeometryCreator';
import { themeColors } from '../../consts/colorConfig';

const getBlockConfig = (shouldRandomColor) => {
  return {
    color: shouldRandomColor ? Math.floor(Math.random() * 0xFFFFFF) : themeColors.block,
    boxWidth: 1,
    boxHeight: 0.1,
    boxDepth: 1
  }
}

class Block extends MazeObject {

  constructor(scene, wallCondition, row, col) {
    super(scene, row, col);

    // up, down, left, right
    this.walls = [];
    this.walls.push(wallCondition.up || null);
    this.walls.push(wallCondition.down || null);
    this.walls.push(wallCondition.left || null);
    this.walls.push(wallCondition.right || null);

    this.location = {
      row, col
    }
  }

  renderObject(isNoWall) {
    const cube = geometryCreator('block', getBlockConfig(isNoWall));

    if (!isNoWall) {
      if (this.walls[0]) this.renderWall(1, 1, 0.1, this.location.row - 0.5, 0.6, this.location.col);
      if (this.walls[1]) this.renderWall(1, 1, 0.1, this.location.row + 0.5, 0.6, this.location.col);
      if (this.walls[2]) this.renderWall(0.1, 1, 1, this.location.row, 0.6, this.location.col - 0.5);
      if (this.walls[3]) this.renderWall(0.1, 1, 1, this.location.row, 0.6, this.location.col + 0.5);
    }
    
    this.scene.add(cube);
    cube.position.x = this.location.col;
    cube.position.z = this.location.row;
  }

  renderWall(width, height, depth, x, y, z) {

    const wallConfig = {
      color: themeColors.wall,
      boxWidth: width,
      boxHeight: height,
      boxDepth: depth
    }

    const wall = geometryCreator('block', wallConfig);

    wall.position.x = z;
    wall.position.y = y;
    wall.position.z = x;
    this.scene.add(wall);
  }

  checkMove(direction) {
    switch(direction) {
      case 'up': return this.walls[0] === null;
      case 'down': return this.walls[1] === null;
      case 'left': return this.walls[2] === null;
      case 'right': return this.walls[3] === null;
      default: break;
    }
  }
}

export default Block;