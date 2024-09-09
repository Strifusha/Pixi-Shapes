export default class ShapeModel {
  constructor(color, size, position) {
    this.color = color;
    this.size = size;
    this.position = position;
  }

  drawShape(graphics) {
    throw new Error("drawShape method should be implemented in subclass");
  }

  calculateArea() {
    throw new Error("calculateArea method should be implemented in subclass");
  }

  calculatePolygonVertices(sides, radius, position) {
    const angle = (Math.PI * 2) / sides;
    const vertices = [];

    for (let i = 0; i < sides; i++) {
      vertices.push(
        position.x + Math.cos(i * angle) * radius,
        position.y + Math.sin(i * angle) * radius,
      );
    }

    return vertices;
  }
}
