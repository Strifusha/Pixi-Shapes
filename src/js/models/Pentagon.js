import ShapeModel from "./ShapeModel";

export default class Pentagon extends ShapeModel {
  constructor(color, size, position) {
    super(color, size, position);
  }

  drawShape(graphics) {
    graphics.fill(this.color);
    const vertices = this.calculatePolygonVertices(
      5,
      this.size / 2,
      this.position,
    );
    graphics.poly(vertices);
    graphics.fill();
  }

  calculateArea() {
    const pentagonAreaConstant =
      (1 / 4) * Math.sqrt(5 * (5 + 2 * Math.sqrt(5)));
    return pentagonAreaConstant * Math.pow(this.size / 2, 2);
  }
}
