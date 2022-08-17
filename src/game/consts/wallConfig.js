const getWallConfig = (setting) => {
  const { surface = null, isLow = true } = setting;
  return {
    surface: _getWallSurface(surface),
    height: isLow ? 1.5 : 3
  }
}

const _getWallSurface = (choice = null) => {
  if (choice) return `src/assets/textures/wall/${choice}.jpeg`;
  return 'src/assets/textures/wall/brick.jpeg'; // default
}

export default getWallConfig;