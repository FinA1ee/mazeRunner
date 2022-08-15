const texturePath = 'src/assets/textures/';

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
  wall: `${texturePath}wall.jpeg`,
  hero: `${texturePath}hero.jpeg`,
  floor: `${texturePath}floor.jpeg`,
  coin: `${texturePath}coin.jpeg`,
  monster: `${texturePath}monster.jpeg`
}

export {
  themeColors,
  themeTexture
}