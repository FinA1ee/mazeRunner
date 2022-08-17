import * as TWEEN from "@tweenjs/tween.js";
import { cameraCreator } from "../../utils/threeBasicsCreator";

class CameraController {
  constructor() {
    this.cameras = new Map();
  }

  addNewCamera(cameraConfig, id) {
    let camera = cameraCreator(cameraConfig);
    this.cameras.set(id, camera);
    this.cameraInCharge = camera;
  }

  renderObject(time) {
    TWEEN.update();
  }

  repositionCamera(id, coords) {
    let camera = this.cameras.get(id);
    let oldCoords = camera.position;

    new TWEEN.Tween(oldCoords)
      .to({x: coords.x, y: coords.y, z: coords.z}, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        camera.position.set(...Object.values(oldCoords));
      })
      .start();
  }

  adjustAspect(val) {
    this.cameraInCharge.aspect = val;
    this.cameraInCharge.updateProjectionMatrix();
  }

  getCamera() {
    return this.cameraInCharge;
  }
}

export default CameraController;