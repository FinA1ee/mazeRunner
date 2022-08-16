const getHeroConfig = (dim, selection, gameStatus) => {
  return {
    location: getHeroInitalLocation(dim, gameStatus),
    geoConfig: getHeroGeoConfig(selection, gameStatus),
    hp: 5
  }
}

// 1
const octahedronHero = (gameStatus) => {
  return {
    selection: 'octa',
    radius: gameStatus === 'Prepare' ? 1.5 : 0.5,
  }
}

// 2
const cylinderHero = (gameStatus) => {
  return {
    selection: 'cyclinder',
    radiusTop: gameStatus === 'Prepare' ? 1.5 : 0.5,
    radiusBottom: gameStatus === 'Prepare' ? 1.5 : 0.5,
    height: gameStatus === 'Prepare' ? 2 : 1,
    radialSegments: 6
  }
}


// 3
const coneHero = (gameStatus) => {
  return {
    selection: 'cone',
    radius: gameStatus === 'Prepare' ? 1.5 : 0.5,
    height: 2,
    radialSegment: 8
  }
}


// 4
const sphereHero = (gameStatus) => {
  return {
    selection: 'sphere',
    radius: gameStatus === 'Prepare' ? 1.5 : 0.5,
    widthSegment: 20,
    heightSegments: 20
  }
}


const getHeroGeoConfig = (selection, gameStatus) => {
  switch(selection) {
    case 2: return cylinderHero(gameStatus);
    case 3: return coneHero(gameStatus);
    case 1: return octahedronHero(gameStatus);
    case 4: return sphereHero(gameStatus);
    default: return octahedronHero(gameStatus);
  }
}

const getHeroInitalLocation = (dim, gameStatus) => {
  if (gameStatus === 'Prepare') {
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