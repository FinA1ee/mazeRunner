const themeColors = {
  background: 0x000000,
  wall: 0x8fb1e9,
  hero: 0xf6f18c,
  light: 0xffffff,
  getBlockColor: () => {
    return Math.floor(Math.random() * 0x1FFFFF);
  },
}

const themeTexture = {
  wall: 'src/assets/textures/wall.jpeg'
}

export {
  themeColors,
  themeTexture
}