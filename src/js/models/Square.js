import ShapeModel from "./ShapeModel";

export default class Square extends ShapeModel {
  constructor(color, size, position) {
    super(color, size, position);
  }

  drawShape(graphics) {
    graphics.fill(this.color);
    graphics.rect(
      this.position.x - this.size / 2,
      this.position.y - this.size / 2,
      this.size,
      this.size,
    );
    graphics.fill();
  }

  calculateArea() {
    return Math.pow(this.size, 2);
  }
}
