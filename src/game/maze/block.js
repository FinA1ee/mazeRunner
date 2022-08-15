import { themeColors, themeTexture } from '../consts/colorConfig';
import { materialCreator } from '../../utils/threeUtilsCreator';
import { meshCreator } from '../../utils/threeBasicsCreator';
import geometryCreator from '../../utils/threeGeometryCreator';
import blockConfig from '../consts/blockConfig';
import Geometry from '../../utils/geometry';

class Block extends Geometry {

  constructor(scene,row, col) {
    super(scene, row, col);

    this.scene = scene;
    // this.walls.up = neighbour.up;
    // this.walls.down = neighbour.down;
    // this.walls.left = neighbour.left;
    // this.walls.right = neighbour.right;

    this.location = {
      row, col
    }
  }

  renderObject() {

    let blockGeo = geometryCreator('block', blockConfig);
    let blockMaterial = materialCreator('color', themeColors.getBlockColor());
    let block = meshCreator(blockGeo, blockMaterial);

    block.position.x = this.location.col;
    block.position.z = this.location.row;

    this.scene.add(block);
  }


  renderWalls(neighbour) {

    let scene = this.scene;
    let walls = {};
    walls.up = neighbour.up;
    walls.down = neighbour.down;
    walls.left = neighbour.left;
    walls.right = neighbour.right;

    if (walls.up) _renderWall(1, 1, 0.1, this.location.row - 0.5, 0.5, this.location.col);
    if (walls.down) _renderWall(1, 1, 0.1, this.location.row + 0.5, 0.5, this.location.col);
    if (walls.left) _renderWall(0.1, 1, 1, this.location.row, 0.5, this.location.col - 0.5);
    if (walls.right) _renderWall(0.1, 1, 1, this.location.row, 0.5, this.location.col + 0.5);

    function _renderWall(width, height, depth, x, y, z) {
      let wallGeo = geometryCreator('block', { width, height, depth });
      let wallMaterial = materialCreator('texture', themeTexture.wall);
      let wall = meshCreator(wallGeo, wallMaterial);
  
      wall.position.x = z;
      wall.position.y = y;
      wall.position.z = x;
      scene.add(wall);
    }

    this.walls = walls;
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