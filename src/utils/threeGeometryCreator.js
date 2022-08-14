import * as Three from 'three';


// a config includes block config or hero config

const geometryCreator = (kind, config) => {
  switch (kind) {
    case 'block':
      return blockCreator(config);
    case 'hero':
      return heroCreator(config);
    default: break;
  }
}

const blockCreator = (config) => {
  let { color, ...boxConfig } = config;
  let { boxWidth, boxHeight, boxDepth } = boxConfig;

  let box = new Three.BoxGeometry(boxWidth, boxHeight, boxDepth);
  let material = new Three.MeshPhongMaterial({ color })
  return new Three.Mesh(box, material);
}

const heroCreator = (config) => {
  let { color, radius } = config;

  let oct = new Three.OctahedronGeometry(radius);
  let material = new Three.MeshPhongMaterial({ color })
  return new Three.Mesh(oct, material);
}


export default geometryCreator;