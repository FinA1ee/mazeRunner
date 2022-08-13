// import Hero from './MazeObject/hero';
import Maze from './Maze/maze';
import * as Three from 'three';


const DEFAULT_OPTIONS = {
  row: 10,
  col: 10
}

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = container.clientWidth;
  const height = container.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}


class Board {

  static instance = null;

  // board = [][] 2d array of cubes

  // options
  // row / col #
  // container
  // 1. hero spawn location
  // 2. has creatures or not
  // 3. point of view
  // 4. material || color

  constructor(options) {

    const {container, dim} = options;

    this.dim = dim;
    this.container = container;

    const fov = 90;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 100;

    const renderer = new Three.WebGLRenderer();
    const camera = new Three.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 15;
    camera.position.y = 5;
    camera.position.x = 5;
    const scene = new Three.Scene();
    this.scene = scene;

    // const boxWidth = 1;
    // const boxHeight = 0.1;
    // const boxDepth = 1;

    // let x = 0;
    // let z = 0;
    // for (let i = 0; i < this.dim; i++) {
    //   for (let j = 0; j < this.dim; j++, z++) {
    //     const box = new Three.BoxGeometry(boxWidth, boxHeight, boxDepth);
    //     const material = new Three.MeshPhongMaterial({color: Math.floor(Math.random() * 0x000FFF)});
    //     const cube = new Three.Mesh(box, material);
    //     scene.add(cube);
    //     cube.position.x = x;
    //     cube.position.z = z;
    //   }
    //   z = 0;
    //   x++;
    // }

    // const heroGeo = new Three.OctahedronGeometry(0.5);
    // const material = new Three.MeshPhongMaterial({color: 0xFFFFFF});
    // const hero = new Three.Mesh(heroGeo, material);
    // scene.add(hero);
    // hero.position.x = 0;
    // hero.position.y = 0.5;
    // hero.position.z = 0;
    // this.hero = hero;

    // add light
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new Three.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    renderer.render(scene, camera);
    container.appendChild(renderer.domElement);

    renderer.domElement.style.height = "100%";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.backgroundColor = "0xFFFFFF"

    function render(time) {
      time *= 0.001;  // convert time to seconds
     
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
  
        console.log(container.clientHeights);
        canvas.style.height = container.clientHeight;
        canvas.style.width = container.clientWidth;
        camera.updateProjectionMatrix();
      }
      

      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }


    requestAnimationFrame(render);
  }

  // moveHero(direction) {
  //   switch(direction) {
  //     case 'up':
  //       this.hero.position.z++;
  //       break;
  //     case 'down':
  //       this.hero.position.z--;
  //       break;
  //     case 'left':
  //       this.hero.position.x--;
  //       break;
  //     case 'right':
  //       this.hero.position.x++;
  //       break
  //   }
  // }

  initGame() {
    this.maze = new Maze(this.scene, this.dim);
    this.maze.renderMaze();
    // create maze
    // create hero & monsters & gold
    // put them on the scene
  }

  restart() {
    // restart the current game
  }

  reconfig() {

  }

  static getInstance = (options = DEFAULT_OPTIONS) => {
    if (!Board.instance) Board.instance = new Board(options);
    return Board.instance;
  }

}

export default Board;

