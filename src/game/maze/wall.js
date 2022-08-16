import Geometry from "./geometry";
import geometryCreator from "../../utils/threeGeometryCreator";
import { meshCreator } from "../../utils/threeBasicsCreator";
import { materialCreator } from "../../utils/threeUtilsCreator";
import { themeColors, themeTexture } from "../consts/colorConfig";

class Wall extends Geometry {
  constructor(scene, location, wallConfig, position) {
    super(scene, location);
    this.scene = scene;
    this.location = location;

    this.generateObject(wallConfig, position);
  }

  generateObject(wallConfig, position) {

    let wallGeo = geometryCreator("wall", wallConfig);
    let wallMaterial = materialCreator("color", 0x66ccff);
    let wall = meshCreator(wallGeo, wallMaterial);

    wall.position.x = position.x;
    wall.position.y = position.y;
    wall.position.z = position.z;

    this.wall = wall;
    this.scene.add(wall);
  }

  renderObject(time) {}
}

export default Wall;