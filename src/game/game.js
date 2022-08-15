import { cameraCreator, orbitControlCreator, rendererCreator, sceneCreator } from '../utils/threeBasicsCreator';
import geometryCreator from '../utils/threeGeometryCreator';
import { colorCreator, lightCreator } from '../utils/threeUtilsCreator';
import { mainCameraConfig, orbitControlConfig } from './consts/cameraConfigs';
import { themeColors } from './consts/colorConfig';
import * as Three from 'three';
import Maze from './maze/maze';
import Hero from './hero';
import getHeroConfig from './consts/heroConfig';


class Game {

  static status = 'Hero Selection' || 'Game Begin' || 'Game End';

  static instance = null;

  constructor(options) {

    const { container, dim } = options;

    this.dim = dim;
    this.container = container;
    
    /** 创建渲染器 */
    this.renderer = rendererCreator();

    /** 创建摄像头 */
    this.mainCamera = cameraCreator(mainCameraConfig);
    // this.orbitControl = orbitControlCreator(this.mainCamera, this.renderer.domElement, orbitControlConfig);
    // this.orbitControl.update();

    /** 创建灯光 */
    this.light = lightCreator(themeColors.light, 1);
    this.light.position.set(-1, 2, 10);

    let scene = sceneCreator();
    this.scene = scene;
    this.scene.add(this.light);
    this.scene.background = colorCreator(themeColors.background);

    /** 加入外部容器 */
    container.appendChild(this.renderer.domElement);

    /** 创建迷宫实例 */
    this.maze = new Maze(this.scene, this.dim);
    this.maze.renderObject();

    /** 创建英雄实例 */
    this.heroSelection = 1;
    this.hero = new Hero(this.scene);
    this.hero.renderObject(getHeroConfig(this.heroSelection, Game.status));
    
    // let text = textCreator('text');
    // text.position.x = 0;

    const height = 2, size = 3;

    let textGeo;
    const loader = new Three.FontLoader();
    loader.load('src/assets/fonts/helvetiker_regular.typeface.json', function(font) {
      let text = new Three.TextGeometry("Maze Runner", {
        font: font,
        size: size,
        height: height
      });
      text.computeBoundingBox();
      let centerOffset = - 0.5 * ( text.boundingBox.max.x - text.boundingBox.min.x );
  
      let material = [
        new Three.MeshPhongMaterial( { color: 0xffffff, flatShading: true } ), // front
        new Three.MeshPhongMaterial( { color: 0xffffff } ) // side
      ];
      textGeo = new Three.Mesh(text, material);
      textGeo.position.x = 10 + centerOffset;
      textGeo.position.y = 10;
      textGeo.position.z = 0;
      scene.add(textGeo);
    })

    /** 开始渲染 */
    this.render();
    console.log(this.scene);
    Game.status = 'Hero Selection';
  }

  changeHero(direction) {
    if (Game.status === 'Hero Selection') {
      if (direction) this.heroSelection = this.heroSelection + 1 === 5 ? 1 : this.heroSelection + 1;
      else this.heroSelection = this.heroSelection - 1 === 0 ? 4 : this.heroSelection - 1;
    }
    this.hero.renderObject(getHeroConfig(this.heroSelection, Game.status));
  }

  render() {
    const renderer = this.renderer;
    const canvas = this.renderer.domElement;
    const container = this.container;
    const camera = this.mainCamera;
    const scene = this.scene;
    const hero = this.hero;
    const control = this.orbitControl;


    function resizeRendererToDisplaySize(renderer, container){
      const canvas = renderer.domElement;
      const width = container.clientWidth;
      const height = container.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      return needResize;
    }

    function animate(time) {
      time *= 0.001;  // convert time to seconds
      if (resizeRendererToDisplaySize(renderer, container)) {
        renderer.setSize(container.clientWidth, container.clientHeight, false);
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
      // control.update();

      if (Game.status === 'Hero Selection') hero.rotateObject(time);

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }


  moveHero(direction) {
    let validMove = this.maze.checkMove(direction, this.hero.getLocation());
    if (validMove) this.hero.move(direction);
  }

  initGame() {

    Game.status = 'Game Begin';

    // maze generate the wall data

    // maze generate the hero data

    // render

    // if (this.maze) {
    //   this.maze.destory();
    //   this.scene.remove.apply(this.scene, this.scene.children);
    // }
    
    // this.scene.remove.apply(this.scene, this.scene.children);
    this.maze.generateMaze();
    this.hero.renderObject(getHeroConfig(this.heroSelection, Game.status));
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
