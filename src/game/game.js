import { orbitControlCreator, rendererCreator, sceneCreator } from '../utils/threeBasicsCreator';
import { colorCreator, lightCreator } from '../utils/threeUtilsCreator';
import { mainCameraConfig, orbitControlConfig } from './consts/cameraConfigs';
import { themeColors } from './consts/colorConfig';
import Maze from './maze/maze';
import Hero from './hero/hero';

import textConfig from './consts/textConfig';

import CameraController from './controller/cameraController';
import TextController from './controller/textController';

class Game {

  static status = 'Prepare' || 'Game Begin' || 'Game End';

  static instance = null;

  constructor(container) {

    this.container = container;
    
    this.dim = window['DEFAULT_DIM']; // default


    // this.orbitControl = orbitControlCreator(this.mainCamera, this.renderer.domElement, orbitControlConfig);
    // this.orbitControl.update();
  
    this._initScene();
    this._initGame();

    /** 加入外部容器 */
    container.appendChild(this.renderer.domElement); 

    /** 开始渲染 */
    this.render();

    Game.status = 'Prepare';
  }

  _initScene() {
    /** 创建场景 */
    this.scene = sceneCreator();

    /** 创建渲染器 */
    this.renderer = rendererCreator();

    /** 创建灯光 */
    this.light = lightCreator(themeColors.light, 1);
    this.light.position.set(-1, 2, 10);

    this.scene.add(this.light);
    this.scene.background = colorCreator(themeColors.background);

    /** 创建镜头管理器 */
    this.cameraController = new CameraController();
    this.cameraController.addNewCamera(mainCameraConfig, 'main');
  }

  _initGame() {
    /** 创建默认迷宫实例 */
    this.maze = new Maze(this.scene);
    /** 创建英雄 */
    this.hero = new Hero(this.scene);
    /** 创建文字管理器 */
    this.textController = new TextController(this.scene);
    this.textController.addNewText(textConfig.titleConfig, 'title');
  }


  // changeMazeSetting(setting) {
  //   this.dim = getMazeConfig(maze).dim;
  //   if (Game.status === 'Prepare') this.maze.generateObject(maze);
  // }

  // changeHeroSetting(setting) {
  //   if (Game.status === 'Prepare') this.hero.generateObject(setting);
  // }

  settingChange(tab, setting) {
    if (Game.status !== 'Prepare') return;
    
    switch(tab) {
      case 'hero':
        this.hero.generateObject(setting);
        break;
      case 'maze':
        this.maze.generateObject(setting);
        break;
      case 'wall':
        this.maze.generateObject(setting);
        break;
    } 
  }

  tabSwitch(setting) {
    switch(setting) {
      case 'hero':
        this.cameraController.repositionCamera('main', {
          x: (this.dim - 1) / 2,
          y: 4,
          z: (this.dim - 1 ) / 2 + 3
        })
        break;
      case 'maze':
        this.cameraController.repositionCamera('main', {
          x: (this.dim - 1) / 2,
          y: 10,
          z: (this.dim - 1) + 10
        })
    }
  }



  render() {
    const scene = this.scene;
    const renderer = this.renderer;
    const canvas = this.renderer.domElement;
    const container = this.container;
    const cameraController = this.cameraController;
    const maze = this.maze;
    const hero = this.hero;
    // const control = this.orbitControl;

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

      /** 处理窗口大小变化情况 */
      if (resizeRendererToDisplaySize(renderer, container)) {
        renderer.setSize(container.clientWidth, container.clientHeight, false);
        cameraController.adjustAspect(canvas.clientWidth / canvas.clientHeight);       
      }


      // // let thisLoop = Date.now();
      // // let fps = 1000 / (thisLoop - lastLoop);
      // // lastLoop = thisLoop;

      maze.renderObject(time);
      hero.renderObject(time);
      cameraController.renderObject(time);

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.render(scene, cameraController.getCamera());

      requestAnimationFrame(animate);
      // control.update();
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

  startGame() {

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

