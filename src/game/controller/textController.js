import TextContent from '../maze/text';

class TextController {
  constructor(scene) {
    this.scene = scene;
    this.texts = new Map();
  }

  addNewText(textConfig, id) {
    let { content, position, ...config } = textConfig;
    console.log(textConfig, config);
    let textGeo = new TextContent(this.scene, content, position, config);
    this.texts.set(textGeo, id);
  }
}

export default TextController;