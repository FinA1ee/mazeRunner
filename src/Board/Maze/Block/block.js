import MazeObject from '../MazeObject/mazeObject';
import * as Three from 'three';

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

  renderObject() {
    const boxWidth = 1;
    const boxHeight = 0.1;
    const boxDepth = 1;

    const box = new Three.BoxGeometry(boxWidth, boxHeight, boxDepth);
    // const randomColor = Math.floor(0x000000);
    const material = new Three.MeshPhongMaterial({color: 0x000000});
    const cube = new Three.Mesh(box, material);

    if (this.walls[0]) this.renderWall(1, 1, 0.1, this.location.row - 0.5, 0.6, this.location.col);
    if (this.walls[1]) this.renderWall(1, 1, 0.1, this.location.row + 0.5, 0.6, this.location.col);
    if (this.walls[2]) this.renderWall(0.1, 1, 1, this.location.row, 0.6, this.location.col - 0.5);
    if (this.walls[3]) this.renderWall(0.1, 1, 1, this.location.row, 0.6, this.location.col + 0.5);
    
    this.scene.add(cube);
    cube.position.x = this.location.col;
    cube.position.z = this.location.row;
  }

  renderWall(width, height, depth, x, y, z) {
    const box = new Three.BoxGeometry(width, height, depth);
    const material = new Three.MeshPhongMaterial({color: 0xFFFFFF});
    const cube = new Three.Mesh(box, material);
    cube.position.x = z;
    cube.position.y = y;
    cube.position.z = x;
    this.scene.add(cube);
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