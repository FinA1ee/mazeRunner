import MazeObject from './mazeObject';
import * as Three from 'three';

class Hero extends MazeObject {
  
  constructor(scene, row, col) {
    super(scene, row, col);
    this.location = {
      row, col
    }    
  }


  renderObject() {
    const radius = 0.5;
    const geo = new Three.OctahedronGeometry(radius)
    const material = new Three.MeshPhongMaterial({color: 0x66CCFF});
    const hero = new Three.Mesh(geo, material);
    this.heroGeo = hero;
    this.scene.add(this.heroGeo);
    hero.position.x = this.location.col;
    hero.position.y = 0.6;
    hero.position.z = this.location.row;
  }

  getLocation() {
    return this.location;
  }

  move(direction) {
    switch(direction) {
      case 'up': 
        this.heroGeo.position.z--;
        this.location.row--;
        break;
      case 'down': 
        this.heroGeo.position.z++;
        this.location.row++;
        break;
      case 'left': 
        this.heroGeo.position.x--;
        this.location.col--;
        break;
      case 'right': 
        this.heroGeo.position.x++;
        this.location.col++;
        break;
      default: break;
    }
  }
}

export default Hero;