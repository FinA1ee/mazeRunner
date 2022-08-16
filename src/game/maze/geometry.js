/**
 * Abstract Geometry Class
 */
export default class Geometry {
  constructor() {
    if (this.constructor === Geometry) {
      throw new Error('Class Geometry cannot be instantiated');
    }
  }

  generateObject() {
    throw new Error('Method Not Implemented');
  }

  renderObject() {
    throw new Error('Method Not Implemented');
  }


  destroyObject() {
    throw new Error('Method Not Implemented');
  }
}