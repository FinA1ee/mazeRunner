import Geometry from "./geometry";
import geometryCreator from "../../utils/threeGeometryCreator";
import { meshCreator } from "../../utils/threeBasicsCreator";
import { materialCreator } from "../../utils/threeUtilsCreator";
import { coinConfig } from "../consts/blockConfig";
import { themeTexture } from "../consts/colorConfig";

class Coin extends Geometry {
  constructor(scene, location, hover) {
    super(scene, location);
    this.scene = scene;
    this.location = location;

    this.generateObject(hover);
  }

  generateObject(hover) {
    
    let coinGeo = geometryCreator("coin", coinConfig);
    let coinMaterial = materialCreator("texture", themeTexture.coin);
    let coin = meshCreator(coinGeo, coinMaterial);

    coin.position.x = this.location.col;
    coin.position.y = hover;
    coin.position.z = this.location.row;

    this.coin = coin;
    this.scene.add(coin);
  }

  renderObject(time) {
    this.coin.rotation.y = time;
  }

  destroyObject() {
    this.scene.remove(this.coin);
  }
}

export default Coin;