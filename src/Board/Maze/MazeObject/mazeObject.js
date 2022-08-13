import * as Three from 'three';
import Geometry from '../geometry';

class MazeObject extends Geometry {

  constructor(scene) {
    super();
    this.scene = scene;
  }
}

export default MazeObject;