import * as Three from 'three';

const container = document.querySelector('#container');

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = container.clientWidth;
  const height = container.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function main() {
  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 100;

  const renderer = new Three.WebGLRenderer();

  const camera = new Three.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 40;
  camera.position.y = 1;
  const scene = new Three.Scene();

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const avatar = new Three.OctahedronGeometry(1);
  const material = new Three.MeshPhongMaterial({color: 0x44aa88});
  const cube = new Three.Mesh(avatar, material);

  // add light
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new Three.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);

  scene.add(cube);
  renderer.render(scene, camera);
  // renderer.domElement.style.height = canvas.clientHeight;
  // renderer.domElement.style.width = canvas.clientWidth;

  container.appendChild(renderer.domElement);

  function render(time) {
    time *= 0.001;  // convert time to seconds
   
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;

      console.log(container.clientHeights);
      canvas.style.height = container.clientHeight;
      canvas.style.width = container.clientWidth;
      camera.updateProjectionMatrix();
    }

    cube.rotation.x = time;
    cube.rotation.y = time;
   
    renderer.render(scene, camera);
   
    // requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();