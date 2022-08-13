import Geometry from "../geometry";
import * as Three from 'three';

const boxWidth = 1;
const boxHeight = 0.1;
const boxDepth = 1;

class Block extends Geometry{

  constructor(scene, wallCondition, row, col) {
    super();
    this.scene = scene;
    this.walls = wallCondition;
    this.location = {
      row,
      col
    }

  }

  renderObject() {
    const box = new Three.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const randomColor = Math.floor(Math.random() * 0xFFFFFF);
    const material = new Three.MeshPhongMaterial({color: randomColor});
    const cube = new Three.Mesh(box, material);
    this.scene.add(cube);
    cube.position.x = this.location.row;
    cube.position.z = this.location.col;
  }

}

export default Block;