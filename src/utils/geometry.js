/**
 * Abstract Geometry Class
 */
export default class Geometry {
  constructor() {
    if (this.constructor === Geometry) {
      throw new Error('Class Geometry cannot be instantiated');
    }
  }

  // applyPosition() {
  //   throw new Error('Method Not Implemented');
  // }

  // applyMaterial() {
  //   throw new Error('Method Not Implemented');
  // }

  generateObject() {
    throw new Error('Method Not Implemented');
  }

  renderObject() {
    
  }

  rotateObject() {
    throw new Error('Method Not Implemented');
  }

  destroyObject() {
    throw new Error('Method Not Implemented');
  }
}