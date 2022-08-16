import { cameraCreator, orbitControlCreator, rendererCreator, sceneCreator } from '../utils/threeBasicsCreator';
import { colorCreator, lightCreator } from '../utils/threeUtilsCreator';
import { mainCameraConfig, orbitControlConfig } from './consts/cameraConfigs';
import { themeColors } from './consts/colorConfig';
import Maze from './maze/maze';
import textConfig from './consts/textConfig';
import TextContent from './maze/text';
import getMazeConfig from './consts/mazeConfig';


class Game {

  static status = 'Prepare' || 'Game Begin' || 'Game End';

  static instance = null;

  constructor(options) {

    const { container } = options;

    // this.dim = dim;
    this.container = container;
    
    /** 创建渲染器 */
    this.renderer = rendererCreator();

    /** 创建摄像头 */
    this.mainCamera = cameraCreator(mainCameraConfig);
    this.orbitControl = orbitControlCreator(this.mainCamera, this.renderer.domElement, orbitControlConfig);
    this.orbitControl.update();

    /** 创建灯光 */
    this.light = lightCreator(themeColors.light, 1);
    this.light.position.set(-1, 2, 10);

    let scene = sceneCreator();
    this.scene = scene;
    this.scene.add(this.light);
    this.scene.background = colorCreator(themeColors.background);

    /** 加入外部容器 */
    container.appendChild(this.renderer.domElement);

    /** 创建默认迷宫实例 */
    this.maze = new Maze(this.scene, getMazeConfig({}));

    /** 创建标题实例 */
    this.title = new TextContent(this.scene, 'Maze Runner', {x: 0, y: 10, z: 0}, textConfig.titleConfig);

    /** 开始渲染 */
    this.render();

    Game.status = 'Prepare';
  }

  changeMazeSetting(setting) {
    if (Game.status === 'Prepare') {
      console.log("setting ",setting);
      this.maze.initMaze(getMazeConfig(setting));
    }
  }

  changeHero(direction) {
    if (Game.status === 'Prepare') {
      if (direction) this.heroSelection = this.heroSelection + 1 === 5 ? 1 : this.heroSelection + 1;
      else this.heroSelection = this.heroSelection - 1 === 0 ? 4 : this.heroSelection - 1;
    }
    // this.hero.generateObject(getHeroConfig(this.heroSelection, Game.status));
  }

  render() {
    const renderer = this.renderer;
    const canvas = this.renderer.domElement;
    const container = this.container;
    const camera = this.mainCamera;
    const scene = this.scene;
    const maze = this.maze;
    const control = this.orbitControl;

    function resizeRendererToDisplaySize(renderer, container){
      const canvas = renderer.domElement;
      const width = container.clientWidth;
      const height = container.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      return needResize;
    }

    let lastLoop = Date.now();
    function animate(time) {
      time *= 0.001;  // convert time to seconds
      if (resizeRendererToDisplaySize(renderer, container)) {
        renderer.setSize(container.clientWidth, container.clientHeight, false);
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      let thisLoop = Date.now();
      let fps = 1000 / (thisLoop - lastLoop);
      lastLoop = thisLoop;

      control.update();

      maze.renderObject(time);
      
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }


  moveHero(direction) {
    if (Game.status !== 'Game Begin') return;
    let validMove = this.maze.moveHero(direction);
    // validMove && this.maze.isGameEnd() && this.gameOver();
  }

  gameOver() {
    console.log("Game End");
  }

  initGame() {

    Game.status = 'Game Begin';
    // if (this.maze) {
    //   this.maze.destory();
    //   this.scene.remove.apply(this.scene, this.scene.children);
    // }
    
    // this.scene.remove.apply(this.scene, this.scene.children);
    this.maze.initGame();
  
  }

  switchCamera(id) {
    if (id === 2) {
      this.mainCamera.rotation.x = 0.5;
      this.orbitControl.update();
      console.log("called");
    }
  }

  restart() {

  }

  reconfig() {

  }

  static getInstance = (options = DEFAULT_OPTIONS) => {
    if (!Game.instance) Game.instance = new Game(options);
    return Game.instance;
  }

}

export default Game;

