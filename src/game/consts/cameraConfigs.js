const mainCameraConfig = {
  fov: 90,
  aspect: 2,
  near: 0.1,
  far: 100,
  position: {
    x: 10,
    y: 10,
    z: 25
  },
  rotation: {
    x: -0.5,
    y: 0,
    z: 0
  }
}

const orbitControlConfig = {
  position: {
    x: 10,
    y: 4,
    z: 10
  },
  autoRotate: true
}

// const mainCameraConfig = {
//   fov: 90,
//   aspect: 2,
//   near: 0.1,
//   far: 100,
//   position: {
//     x: 10,
//     y: 0,
//     z: 25
//   },
//   rotation: {
//     x: 0,
//     y: 0,
//     z: 0
//   }
// }


export {
  mainCameraConfig,
  orbitControlConfig
}