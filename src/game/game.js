import * as Three from 'three';
import { cameraCreator, rendererCreator, resizeRendererToDisplaySize, sceneCreator } from '../utils/threeBasicsCreator';
import { colorCreator, lightCreator } from '../utils/threeUtilsCreator';
import { mainCameraConfig } from './consts/cameraConfigs';
import { themeColors } from './consts/colorConfig';
import OrbitControls from 'three-orbitcontrols';

import Maze from './maze/maze';


class Game {

  static instance = null;

  constructor(options) {

    const { container, dim } = options;

    this.dim = dim;
    this.container = container;
    
    /** 创建场景 */
    this.renderer = rendererCreator();
    this.mainCamera = cameraCreator(mainCameraConfig);
    this.controls = new OrbitControls(this.mainCamera, this.renderer.domElement);
    this.controls.target.set( 10, 4, 10 );
    this.controls.update();

    this.light = lightCreator(themeColors.light, 1);
    this.light.position.set(-1, 2, 10);
    this.scene = sceneCreator();

    this.scene.add(this.light);
    this.scene.background = colorCreator(themeColors.background);

    /** 开始渲染 */
    // this.renderer.render(this.scene, this.mainCamera);

    /** 加入外部容器 */
    container.appendChild(this.renderer.domElement);

    /** 创建迷宫实例 */
    this.maze = new Maze(this.scene, this.dim);
    this.maze.renderMaze(true);

    /** 开始渲染 */
    this.render();
  }

  render() {
    const renderer = this.renderer;
    const canvas = this.renderer.domElement;
    const container = this.container;
    const camera = this.mainCamera;
    const scene = this.scene;
    const control = this.controls;
    console.log(canvas.clientWidth, this.container.clientWidth);

    function animate(time) {
      time *= 0.001;  // convert time to seconds
      if (resizeRendererToDisplaySize(renderer, container)) {

        renderer.setSize(container.clientWidth, container.clientHeight, false);
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
      control.update();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }


  moveHero(direction) {
    this.maze.moveHero(direction);
  }

  initGame() {

    // maze generate the wall data

    // maze generate the hero data

    // render

    // if (this.maze) {
    //   this.maze.destory();
    //   this.scene.remove.apply(this.scene, this.scene.children);
    // }
    
    // this.scene.remove.apply(this.scene, this.scene.children);
    this.maze.renderMaze();
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

