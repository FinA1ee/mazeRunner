import * as Three from 'three';

const colorCreator = (color) => {
  return new Three.Color(color);
}

const lightCreator = (color, intensity) => {
  return new Three.HemisphereLight(0xffffbb, 0x080820, 1);
}

export { colorCreator, lightCreator};