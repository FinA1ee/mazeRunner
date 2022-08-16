const getDim = (difficulty) => {
  if (difficulty === 'easy') return 20;
  if (difficulty === 'medium') return 35;
  if (difficulty === 'hard') return 50;
  return 10; // default
}

const getFloorTexturePath = (choice) => {
  if (choice) return `src/assets/textures/floor/${choice}.jpeg`;
  return 'src/assets/textures/floor/avatar.jpeg'; // default
}

const getMazeConfig = (mazeSettings) => {
  console.log(mazeSettings)
  const { difficulty = null, appearance = null } = mazeSettings;
  return {
    dim: getDim(difficulty),
    floorTexture: getFloorTexturePath(appearance)
  }
}


export default getMazeConfig;