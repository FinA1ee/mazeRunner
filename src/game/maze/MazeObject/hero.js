import MazeObject from './mazeObject';
import { themeColors } from '../../consts/colorConfig';
import geometryCreator from '../../../utils/threeGeometryCreator';

const heroConfig = {
  color: themeColors.hero,
  radius: 0.5
}

class Hero extends MazeObject {
  
  constructor(scene, row, col) {
    super(scene, row, col);
    this.location = {
      row, col
    }    
  }


  renderObject() {
    let hero = geometryCreator('hero', heroConfig);
    hero.position.x = this.location.col;
    hero.position.y = 0.6;
    hero.position.z = this.location.row;
    this.scene.add(hero);

    this.hero = hero;
  }

  getLocation() {
    return this.location;
  }

  move(direction) {
    switch(direction) {
      case 'up': 
        this.hero.position.z--;
        this.location.row--;
        break;
      case 'down': 
        this.hero.position.z++;
        this.location.row++;
        break;
      case 'left': 
        this.hero.position.x--;
        this.location.col--;
        break;
      case 'right': 
        this.hero.position.x++;
        this.location.col++;
        break;
      default: break;
    }
  }
}

export default Hero;