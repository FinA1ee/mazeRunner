import geometryCreator from '../utils/threeGeometryCreator';
import Geometry from '../utils/geometry';
import { themeColors } from './consts/colorConfig';
import getHeroConfig from './consts/heroConfig';
import { materialCreator } from '../utils/threeUtilsCreator';
import { meshCreator } from '../utils/threeBasicsCreator';

class Hero extends Geometry {
  
  constructor(scene) {
    super(scene);
    this.scene = scene;
  }



  // {
  //   heroSelection: #
  //   {
  //     location: x / y
  //   } 
  //   geoConfig
  // }
  renderObject(heroConfig) {

    /** gc the old objs */
    this.destroyObject();

    /** create new */
    let { location, geoConfig } = heroConfig;
    console.log(location, geoConfig);
    let heroGeo = geometryCreator('hero', geoConfig);
    let material = materialCreator('color', themeColors.hero);
    let hero = meshCreator(heroGeo, material);

    hero.position.x = location.x;
    hero.position.y = location.y;
    hero.position.z = location.z;

    this.scene.add(hero);
    this.hero = hero;
  }

  destroyObject() {
    this.scene.remove(this.hero);
    delete this.hero;
    this.hero = null;
  }


  rotateObject(time) {
    this.hero.rotation.y = time;
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