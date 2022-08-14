import * as Three from 'three';

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

const resizeRendererToDisplaySize = (renderer, container) => {
  const canvas = renderer.domElement;
  const width = container.clientWidth;
  const height = container.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  return needResize;
}

    // add light
    // const color = 0xFFFFFF;
    // const intensity = 1;
    // const light = new Three.DirectionalLight(color, intensity);
    // light.position.set(-1, 2, 4);
    // scene.add(light);
    // scene.background = new Three.Color(0x8fb1e9);


export { rendererCreator, cameraCreator, sceneCreator, resizeRendererToDisplaySize};