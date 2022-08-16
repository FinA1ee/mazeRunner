import * as Three from 'three';

const geometryCreator = (kind, config) => {
  switch (kind) {
    case 'block':
      return blockCreator(config);
    case 'wall':
      return blockCreator(config);
    case 'hero':
      return heroCreator(config);
    case 'text':
      return textCreator(config);
    case 'coin':
      return coinCreator(config);
    case 'monster':
      return monsterCreator(config);
    default: break;
  }
}

const textCreator = (textConfig) => {
  let { content, ...detailConfig } = textConfig;
  let text = new Three.TextGeometry(content, detailConfig);
  return text;
}

const blockCreator = (config) => {
  config = Object.values(config);
  let box = new Three.BoxGeometry(...config);
  return box;
}

const heroCreator = (config) => {
  let oct;
  let { selection, ...heroConfig } = config;
  heroConfig = Object.values(heroConfig);

  switch(selection) {
    case 'cyclinder':
      oct = new Three.CylinderGeometry(...heroConfig);
      break;
    case 'cone':
      oct = new Three.ConeGeometry(...heroConfig);
      break;
    case 'octa':
      oct = new Three.OctahedronGeometry(...heroConfig);
      break;
    case 'sphere':
      oct = new Three.SphereGeometry(...heroConfig);
      break;
  }
  return oct;
}

const coinCreator = (config) => {
  config = Object.values(config);
  let coin = new Three.TorusGeometry(...config);
  return coin;
}

const monsterCreator = (config) => {
  config = Object.values(config);
  let monster = new Three.TorusKnotGeometry(...config);
  return monster;
}


export default geometryCreator;