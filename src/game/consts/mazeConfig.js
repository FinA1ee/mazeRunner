const getDim = (difficulty) => {
  if (difficulty === 'easy') return 15;
  if (difficulty === 'medium') return 25;
  if (difficulty === 'hard') return 35;
  return window['DEFAULT_DIM']; // default
}

const getFloorTexturePath = (choice) => {
  if (choice) return `src/assets/textures/floor/${choice}.jpeg`;
  return 'src/assets/textures/floor/avatar.jpeg'; // default
}

const getMazeConfig = (mazeSettings) => {
  const { difficulty = null, appearance = null } = mazeSettings;
  return {
    dim: getDim(difficulty),
    floorTexture: getFloorTexturePath(appearance)
  }
}


export default getMazeConfig;