import * as Three from 'three';
import { FontLoader } from '../../node_modules/three/examples/jsm/loaders/FontLoader';

const materialCreator = (kind, value) => {
  let material;
  switch(kind) {
    case 'color':
      material = new Three.MeshPhongMaterial({ color: value });
      break;
    case 'texture':
      const loader = new Three.TextureLoader();
      material = new Three.MeshPhongMaterial({
        map: loader.load(value)
      });
      break;
    default: 
      break;
  }
  return material;
}

const colorCreator = (color) => {
  return new Three.Color(color);
}

const lightCreator = (colorConfig, intensity) => {
  return new Three.HemisphereLight(0xffffff, 0x080820, 1);
}

const fontLoaderCreator = () => {
  return new FontLoader();
}

export { colorCreator, lightCreator, materialCreator, fontLoaderCreator };