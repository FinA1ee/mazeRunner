const getHeroConfig = (dim, config) => {
  const { shape, skin } = config;
  return {
    location: getHeroInitalLocation(dim),
    geoConfig: getHeroGeoConfig(shape),
    skin: getHeroSkin(skin)
    // hp: 5
  }
}

// 1
const octahedronHero = (gameStatus) => {
  return {
    selection: 'octa',
    radius: gameStatus !== 'Game Begin' ? 1.5 : 0.5,
  }
}

// 2
const cylinderHero = (gameStatus) => {
  return {
    selection: 'cyclinder',
    radiusTop: gameStatus !== 'Game Begin' ? 1.5 : 0.5,
    radiusBottom: gameStatus !== 'Game Begin' ? 1.5 : 0.5,
    height: gameStatus !== 'Game Begin' ? 4 : 1,
    radialSegments: 20
  }
}


// 3
const coneHero = (gameStatus) => {
  return {
    selection: 'cone',
    radius: gameStatus !== 'Game Begin' ? 1 : 0.5,
    height: 4,
    radialSegment: 20
  }
}


// 4
const sphereHero = (gameStatus) => {
  return {
    selection: 'sphere',
    radius: gameStatus !== 'Game Begin' ? 1.5 : 0.5,
    widthSegment: 20,
    heightSegments: 20
  }
}

const getHeroSkin = (choice) => {
  if (choice) return `src/assets/textures/hero/${choice}.jpeg`;
  return 'src/assets/textures/hero/blood.jpeg'; // default
}

const getHeroGeoConfig = (selection = null, gameStatus = null) => {
  switch(selection) {
    case 'cylinder': return cylinderHero(gameStatus);
    case 'cone': return coneHero(gameStatus);
    case 'octa': return octahedronHero(gameStatus);
    case 'sphere': return sphereHero(gameStatus);
    default: return octahedronHero(gameStatus);
  }
}

const getHeroInitalLocation = (dim, gameStatus) => {
  if (gameStatus !== 'Game Begin') {
    return {
      x: (dim - 1) / 2,
      y: 2,
      z: (dim - 1) / 2,
    }
  } else {
    return {
      x: 0,
      y: 0.5,
      z: 0
    }
  }
}

export default getHeroConfig;