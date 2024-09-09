import ShapeModel from "./ShapeModel";

export default class Circle extends ShapeModel {
  constructor(color, size, position) {
    super(color, size, position);
  }

  drawShape(graphics) {
    graphics.fill(this.color);
    graphics.circle(this.position.x, this.position.y, this.size / 2);
    graphics.fill();
  }

  calculateArea() {
    return Math.PI * Math.pow(this.size / 2, 2);
  }
}
