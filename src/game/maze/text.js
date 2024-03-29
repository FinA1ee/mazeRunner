import { meshCreator } from "../../utils/threeBasicsCreator";
import geometryCreator from "../../utils/threeGeometryCreator";
import { fontLoaderCreator, materialCreator } from "../../utils/threeUtilsCreator";
import Geometry from "./geometry";

class TextContent extends Geometry {

  constructor(scene, content, position, textConfig) {
    super(scene);
    this.scene = scene;
    this.position = position;
    this.content = content;
    this.text = null;
    this.generateObject(textConfig);
  }

  generateObject(textConfig) {
    
    const { fontPath, ...detailConfig } = textConfig;

    let _this = this;
    let textGeo, material, text;
    let loader = fontLoaderCreator();

    loader.load(fontPath, function(font) {
      textGeo = geometryCreator('text', 
        Object.assign({
          content: _this.content,
          font: font
        }, detailConfig)
      );
      material = [
        
        materialCreator('color', 0xffffff),
        materialCreator('texture', 'src/assets/textures/font.jpeg'),
      ]
      text = meshCreator(textGeo, material);
      text.position.x = _this.position.x;
      text.position.y = _this.position.y;
      text.position.z = _this.position.z;

      _this.text = text;
      _this.scene.add(text);

      // console.log("position", this.position, this.text);
            // text.computeBoundingBox();
      // let centerOffset = - 0.5 * ( text.boundingBox.max.x - text.boundingBox.min.x );
  
    })
  }

  renderObject(time) {

  }

  destroyObject() {
    this.scene.remove(this.text);
  }

}

export default TextContent;



