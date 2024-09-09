import ShapeModel from "./ShapeModel";

export default class Hexagon extends ShapeModel {
  constructor(color, size, position) {
    super(color, size, position);
  }

  drawShape(graphics) {
    graphics.fill(this.color);
    const vertices = this.calculatePolygonVertices(
      6,
      this.size / 2,
      this.position,
    );
    graphics.poly(vertices);
    graphics.fill();
  }

  calculateArea() {
    return ((3 * Math.sqrt(3)) / 2) * Math.pow(this.size / 2, 2);
  }
}
