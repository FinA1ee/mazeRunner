import ThreeObjectConfig from "./base";

enum GameGeometryKinds {
  Floor = 0,
  Wall = 1,
  Hero = 2,
  Text = 3,
  Coin = 4,
  Monster = 5
};

interface BoxGeometryConfig {
  width: number,
  height: number,
  depth: number
}

interface textGeometryConfig {
  content: string,
}

interface CameraConfig extends ThreeObjectConfig {
  fov: number,
  aspect: number,
  near: number,
  far: number
}

export { CameraConfig };