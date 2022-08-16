import * as Three from 'three';

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

const lightCreator = (color, intensity) => {
  return new Three.HemisphereLight(0xffffbb, 0x080820, 1);
}

const fontLoaderCreator = () => {
  return new Three.FontLoader();
}

export { colorCreator, lightCreator, materialCreator, fontLoaderCreator };