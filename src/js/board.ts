import * as Three from 'three';

const fov = 75;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 5;

const canvas = document.querySelector('#board');
const renderer = new Three.WebGLRenderer({ canvas });

const camera = new Three.PerspectiveCamera(fov, aspect, near, far);


class Board {

  private maze;
  private hero;
  private entrance;
  private exit;

  constructor() {

  }
}

