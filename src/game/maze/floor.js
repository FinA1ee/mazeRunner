import { themeColors, themeTexture } from '../consts/colorConfig';
import { materialCreator } from '../../utils/threeUtilsCreator';
import { meshCreator } from '../../utils/threeBasicsCreator';
import geometryCreator from '../../utils/threeGeometryCreator';
import { blockConfig } from '../consts/blockConfig';
import Geometry from './geometry';
import Wall from './wall';
import Coin from './coin';
import Monster from './monster';

class Floor extends Geometry {

  constructor(scene, location, texture) {
    super(scene, location);

    this.objOnBlock = null;
    this.scene = scene;
    this.texture = texture;
    this.location = location;

    this.generateObject();
  }

  generateObject() {
    let blockGeo = geometryCreator('block', blockConfig);

    let blockMaterial = materialCreator('color', 0xffffff);
    let block = meshCreator(blockGeo, blockMaterial);

    block.position.x = this.location.col;
    block.position.z = this.location.row;

    this.block = block;
    this.scene.add(block);
  }

  renderObject(time) {
    // const objs = Object.values(this.walls);
    // console.log(objs);
    // Object.values(this.walls).forEach((obj) => obj.renderObject(time));
    this.objOnBlock && this.objOnBlock.renderObject(time);
  }

  genObject(kind) {
    if (this.objOnBlock) return false;
    
    switch(kind) {
      case 'coin':
        this.objOnBlock = new Coin(this.scene, this.location, 0.5);
        break;
      case 'monster':
        this.objOnBlock = new Monster(this.scene, this.location, 0.5);
        break;
      default: 
        break;         
    }

    return true;
  }

  genWalls(neighbour) {
    let walls = {};
    let scene = this.scene;
    let location = this.location;

    function _genWall(width, height, depth, x, y, z) {
      let wall = new Wall(scene, location, { width, height, depth }, { x: z, y: y, z: x });
      return wall;
    }
    
    if (neighbour.up) walls.up = _genWall(1, 1, 0.1, this.location.row - 0.5, 0.5, this.location.col);
    if (neighbour.down) walls.down = _genWall(1, 1, 0.1, this.location.row + 0.5, 0.5, this.location.col);
    if (neighbour.left) walls.left = _genWall(0.1, 1, 1, this.location.row, 0.5, this.location.col - 0.5);
    if (neighbour.right) walls.right = _genWall(0.1, 1, 1, this.location.row, 0.5, this.location.col + 0.5);
    this.walls = walls;
  }

  tryMoveHero(hero) {
    if (!this.objOnBlock) return;

    if (this.objOnBlock instanceof Coin) {
      hero.collectCoin();
      this.objOnBlock.destroyObject();
      delete this.objOnBlock;
      this.objOnBlock = null;
    }

    if (this.objOnBlock instanceof Monster) {
      hero.encounterMonster();
      this.objOnBlock.destroyObject();
      delete this.objOnBlock;
      this.objOnBlock = null;
    }
  }

  checkMove(direction) {
    return !this.walls[direction];
  }

  destroyObject() {
    if (this.objOnBlock) {
      this.objOnBlock.destroyObject();
    }

    if (this.walls) {
      this.walls.up?.destroyObject();
      this.walls.down?.destroyObject();
      this.walls.left?.destroyObject();
      this.walls.right?.destroyObject();
    }

    this.scene.remove(this.block);
  }
}

export default Floor;