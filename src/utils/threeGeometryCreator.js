import * as Three from 'three';
import { TextGeometry } from '../../node_modules/three/examples/jsm/geometries/TextGeometry';

const geometryCreator = (kind, config) => {
  switch (kind) {
    case 'block':
      return boxCreator(config);
    case 'wall':
      return boxCreator(config);
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
  let text = new TextGeometry(content, detailConfig);
  return text;
}

const boxCreator = (config) => {
  const { width, height, depth } = config; 
  let box = new Three.BoxGeometry(width, height, depth);
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