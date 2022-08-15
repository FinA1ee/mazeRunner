import * as Three from 'three';
import OrbitControls from 'three-orbitcontrols';

const rendererCreator = () => {
  let renderer = new Three.WebGLRenderer();
  renderer.domElement.style.height = "100%";
  renderer.domElement.style.width = "100%";
  return renderer;
}

const cameraCreator = (cameraConfig) => {
  const { fov, aspect, near, far, position, rotation } = cameraConfig;
  let camera = new Three.PerspectiveCamera(fov, aspect, near, far);

  const { x: posX, y: posY, z: posZ } = position;
  const { x: rotX, y: rotY, z: rotZ } = rotation;

  camera.position.x = posX;
  camera.position.y = posY;
  camera.position.z = posZ;

  camera.rotation.x = rotX;
  camera.rotation.y = rotY;
  camera.rotation.z = rotZ;

  return camera;
}

const sceneCreator = () => {
  return new Three.Scene();
}

const orbitControlCreator = (camera, domElement, config) => {
  const { position: {x, y, z}, autoRotate } = config;

  let control = new OrbitControls(camera, domElement);
  control.target.set( x, y, z );
  control.autoRotate = autoRotate;

  return control;
}

const meshCreator = (geometry, material) => {
  return new Three.Mesh(geometry, material);
}

export { rendererCreator, cameraCreator, sceneCreator, orbitControlCreator, meshCreator};