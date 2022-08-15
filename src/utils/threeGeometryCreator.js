import * as Three from 'three';
import { FontLoader, TextGeometry } from 'three';

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

// const textCreator = async (config) => {

//   const height = 5,
// 				size = 80,
// 				curveSegments = 4,
// 				bevelThickness = 2,
// 				bevelSize = 1.5;

//   let text;
//   let centerOffset;
//   const loader = new FontLoader();
//   loader.load('src/assets/fonts/helvetiker_regular.typeface.json', function(font) {
//     text = createText(font);
//     text.computeBoundingBox();
//     centerOffset = - 0.5 * ( text.boundingBox.max.x - text.boundingBox.min.x );

//     let material = [
//       new Three.MeshPhongMaterial( { color: 0x000000, flatShading: true } ), // front
//       new Three.MeshPhongMaterial( { color: 0x000000 } ) // side
//     ];
//     let geo =  new Three.Mesh(text, material);
//     geo.position.x = centerOffset;
//     return geo;
//   })

//   const createText = font => {
//     return new TextGeometry("Maze Runner", {
//       font: font,
//       size: size,
//       height: height,
//       curveSegments: curveSegments,
//       bevelThickness: bevelThickness,
//       bevelSize: bevelSize,
//       bevelEnabled: true,
//       bevelSize: 8,
//       bevelOffset: 0,
//       bevelSegments: 5
//     })
//   }
// }

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