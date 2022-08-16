import geometryCreator from '../utils/threeGeometryCreator';
import Geometry from './maze/geometry';
import { themeColors, themeTexture } from './consts/colorConfig';
import getHeroConfig from './consts/heroConfig';
import { materialCreator } from '../utils/threeUtilsCreator';
import { meshCreator } from '../utils/threeBasicsCreator';

class Hero extends Geometry {
  
  constructor(scene, heroConfig) {
    super(scene);
    this.scene = scene;
    this.coins = 0;
    this.generateObject(heroConfig);
  }

  generateObject(heroConfig) {

    /** gc the old objs */
    this.destroyObject();

    /** create new */
    let { location, geoConfig, hp } = heroConfig;
    let heroGeo = geometryCreator('hero', geoConfig);
    let material = materialCreator('color', themeColors.hero);
    let hero = meshCreator(heroGeo, material);

    hero.position.x = location.x;
    hero.position.y = location.y;
    hero.position.z = location.z;

    this.hp = hp;
    this.hero = hero;
    this.scene.add(hero);
  }

  destroyObject() {
    this.scene.remove(this.hero);
    delete this.hero;
    this.hero = null;
  }

  renderObject(time) {
    this.hero.rotation.y = time;
  }

  getLocation() { 
    return {
      row: this.hero.position.z,
      col: this.hero.position.x
    }
  }

  collectHp() {
    this.hp++;
  }

  collectCoin() {
    this.coins++;
  }

  encounterMonster() {
    this.hp--;
  }

  dead() {
    return this.hp <= 0;
  }

  move(direction) {
    switch(direction) {
      case 'up': 
        this.hero.position.z--;
        break;
      case 'down': 
        this.hero.position.z++;
        break;
      case 'left': 
        this.hero.position.x--;
        break;
      case 'right': 
        this.hero.position.x++;
        break;
      default: break;
    }
  }
}

export default Hero;