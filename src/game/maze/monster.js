import Geometry from "../../utils/geometry";
import geometryCreator from "../../utils/threeGeometryCreator";
import { meshCreator } from "../../utils/threeBasicsCreator";
import { materialCreator } from "../../utils/threeUtilsCreator";
import { monsterConfig } from "../consts/blockConfig";
import { themeTexture } from "../consts/colorConfig";

class Monster extends Geometry {
  constructor(scene, location, hover) {
    super(scene, location);
    this.scene = scene;
    this.location = location;

    this.generateObject(hover);
  }

  generateObject(hover) {
    let monGeo = geometryCreator("monster", monsterConfig);
    let monMaterial = materialCreator("texture", themeTexture.monster);
    let mon = meshCreator(monGeo, monMaterial);

    mon.position.x = this.location.col;
    mon.position.y = hover;
    mon.position.z = this.location.row;

    this.mon = mon;
    this.scene.add(mon);
  }

  renderObject(time) {
    this.mon.rotation.x = time;
    this.mon.rotation.y = time;
    this.mon.rotation.z = time;
  }

  destroyObject() {
    this.scene.remove(this.mon);
  }
}

export default Monster;