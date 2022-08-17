import Geometry from "./geometry";
import geometryCreator from "../../utils/threeGeometryCreator";
import { meshCreator } from "../../utils/threeBasicsCreator";
import { materialCreator } from "../../utils/threeUtilsCreator";
import { themeColors, themeTexture } from "../consts/colorConfig";
import getWallConfig from "../consts/wallConfig";
import * as Three from 'three';
class Wall extends Geometry {
  constructor(scene, location, wallConfig, position, settings) {
    super(scene, location);
    this.scene = scene;
    this.location = location;
    
    this.generateObject(wallConfig, position, settings);
  }

  generateObject(wallConfig, position, settings = {}) {
    console.log("wall: ", settings);
    let { surface, height } = getWallConfig(settings);
    wallConfig.height = height;

    let wallGeo = geometryCreator("wall", wallConfig);
    let wallMaterial = materialCreator("texture", surface);
    let wall = meshCreator(wallGeo, wallMaterial);

    wall.position.x = position.x;
    wall.position.y = position.y;
    wall.position.z = position.z;

    this.wall = wall;
    this.scene.add(wall);
  }

  renderObject(time) {
    // let { surface, height } = getWallConfig(window['WALL_SETTINGS'] || {})
    // console.log(surface)
    // this.wall.material.map = this.loader.load(surface);
    // this.wall.material.needsUpdate = true
  }

  destroyObject() {
    this.scene.remove(this.wall);
  }
}

export default Wall;