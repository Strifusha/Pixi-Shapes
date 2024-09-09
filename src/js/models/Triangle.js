import ShapeModel from "./ShapeModel";

export default class Triangle extends ShapeModel {
  constructor(color, size, position) {
    super(color, size, position);
  }

  drawShape(graphics) {
    graphics.fill(this.color);
    graphics.poly([
      this.position.x,
      this.position.y - this.size / 2,
      this.position.x - this.size / 2,
      this.position.y + this.size / 2,
      this.position.x + this.size / 2,
      this.position.y + this.size / 2,
    ]);
    graphics.fill();
  }

  calculateArea() {
    return (Math.sqrt(3) / 4) * Math.pow(this.size, 2);
  }
}
