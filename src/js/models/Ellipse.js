import ShapeModel from "./ShapeModel";

export default class Ellipse extends ShapeModel {
  constructor(color, size, position) {
    super(color, size, position);
  }

  drawShape(graphics) {
    graphics.fill(this.color);
    graphics.ellipse(
      this.position.x,
      this.position.y,
      this.size / 2,
      this.size / 4,
    );
    graphics.fill();
  }

  calculateArea() {
    return Math.PI * (this.size / 2) * (this.size / 4);
  }
}
