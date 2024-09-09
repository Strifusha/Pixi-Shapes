import ShapeView from "../views/ShapeView.js";
import {
  getRandomShapeType,
  getRandomColor,
} from "../../utils/randomGenerators.js";
import {
  ELEMENT_IDS,
  EVENT_TYPES,
  SHAPE_TYPES,
  INITIAL_SHAPES_COUNTER,
  INITIAL_SURFACE_AREA,
  SHAPES_PER_SEC_STEP,
  GRAVITY_VALUE_STEP,
  MAX_GRAVITY_VALUE,
  MAX_SHAPES_VALUE,
  MAX_X_COORDINATE,
  DEFAULT_SHAPE_SIZE,
} from "../../utils/constants";
import Ellipse from "../models/Ellipse";
import Circle from "../models/Circle";
import Hexagon from "../models/Hexagon";
import Pentagon from "../models/Pentagon";
import Square from "../models/Square";
import Triangle from "../models/Triangle";

export default class ShapeController {
  constructor() {
    this.view = new ShapeView(this);
    this.gravity = GRAVITY_VALUE_STEP;
    this.shapesPerSecond = SHAPES_PER_SEC_STEP;
    this.lastShapeTime = 0;

    // HTML elements for visualization
    this.shapeCountElement = document.getElementById(ELEMENT_IDS.SHAPE_COUNT);
    this.surfaceAreaElement = document.getElementById(ELEMENT_IDS.SURFACE_AREA);
    this.shapesPerSecondElement = document.getElementById(
      ELEMENT_IDS.SHAPES_PER_SECOND,
    );
    this.maxShapes = document.getElementById(ELEMENT_IDS.MAX_SHAPES);
    this.gravityValueElement = document.getElementById(
      ELEMENT_IDS.GRAVITY_VALUE,
    );
    this.maxGravity = document.getElementById(ELEMENT_IDS.MAX_GRAVITY);

    this.shapeCountElement.textContent = INITIAL_SHAPES_COUNTER;
    this.surfaceAreaElement.textContent = INITIAL_SURFACE_AREA + " px²";
    this.shapesPerSecondElement.textContent = SHAPES_PER_SEC_STEP;
    this.gravityValueElement.textContent = GRAVITY_VALUE_STEP;
  }

  initialize() {
    this.view.init();

    this.addEventListeners();
    this.startShapeGeneration();
  }

  addEventListeners() {
    const controls = [
      {
        id: ELEMENT_IDS.INCREASE_GRAVITY,
        action: () => this.adjustGravity(GRAVITY_VALUE_STEP),
      },
      {
        id: ELEMENT_IDS.DECREASE_GRAVITY,
        action: () => this.adjustGravity(-GRAVITY_VALUE_STEP),
      },
      {
        id: ELEMENT_IDS.INCREASE_SHAPES,
        action: () => this.adjustShapesPerSecond(SHAPES_PER_SEC_STEP),
      },
      {
        id: ELEMENT_IDS.DECREASE_SHAPES,
        action: () => this.adjustShapesPerSecond(-SHAPES_PER_SEC_STEP),
      },
    ];

    // Attach click events to each control
    controls.forEach(({ id, action }) => {
      document.getElementById(id).addEventListener("click", action);
    });

    // Listen for canvas clicks to create shapes manually
    document
      .getElementById(ELEMENT_IDS.CANVAS_CONTAINER)
      .addEventListener(
        EVENT_TYPES.POINTER_DOWN,
        this.handleCanvasClick.bind(this),
      );
  }

  handleCanvasClick(event) {
    const rect = this.view.app.canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / 2;
    const y = (event.clientY - rect.top) / 2;
    this.createShapeModel(x, y);
  }

  // Create a new shape model and pass it to the view for rendering
  createShapeModel(x, y = -50) {
    let shapeModel;
    const shapeType = getRandomShapeType();

    switch (shapeType) {
      case SHAPE_TYPES.TRIANGLE:
        shapeModel = new Triangle(getRandomColor(), DEFAULT_SHAPE_SIZE, {
          x,
          y,
        });
        break;
      case SHAPE_TYPES.SQUARE:
        shapeModel = new Square(getRandomColor(), DEFAULT_SHAPE_SIZE, { x, y });
        break;
      case SHAPE_TYPES.PENTAGON:
        shapeModel = new Pentagon(getRandomColor(), DEFAULT_SHAPE_SIZE, {
          x,
          y,
        });
        break;
      case SHAPE_TYPES.HEXAGON:
        shapeModel = new Hexagon(getRandomColor(), DEFAULT_SHAPE_SIZE, {
          x,
          y,
        });
        break;
      case SHAPE_TYPES.ELLIPSE:
        shapeModel = new Ellipse(getRandomColor(), DEFAULT_SHAPE_SIZE, {
          x,
          y,
        });
        break;
      case SHAPE_TYPES.CIRCLE:
        shapeModel = new Circle(getRandomColor(), DEFAULT_SHAPE_SIZE, { x, y });
        break;
      default:
        shapeModel = new Square(getRandomColor(), DEFAULT_SHAPE_SIZE, { x, y });
    }

    this.view.createShape(shapeModel);
    this.updateVisualization();
  }

  createRandomShape() {
    const x = Math.min(
      Math.random() * this.view.app.renderer.width,
      MAX_X_COORDINATE,
    );
    this.createShapeModel(x);
  }

  startShapeGeneration() {
    this.lastShapeTime = performance.now(); // Track the current time
    this.shapeGenerationLoop(); // Start the loop
  }

  shapeGenerationLoop() {
    const currentTime = performance.now();
    const timeSinceLastShape = currentTime - this.lastShapeTime;

    // Check if enough time has passed to generate a new shape
    if (timeSinceLastShape >= 1000 / this.shapesPerSecond) {
      this.createRandomShape();
      this.lastShapeTime = currentTime;
    }

    requestAnimationFrame(this.shapeGenerationLoop.bind(this));
  }

  // Update the UI to reflect the number of shapes and total surface area
  updateVisualization() {
    const shapeCount = this.view.shapes.length;
    const totalSurfaceArea = this.view.shapes.reduce((acc, { model }) => {
      if (model && typeof model.calculateArea === "function") {
        return acc + model.calculateArea();
      }
      return acc;
    }, 0);

    this.shapeCountElement.textContent = shapeCount;
    this.surfaceAreaElement.textContent = totalSurfaceArea.toFixed(2);
  }

  adjustGravity(value) {
    const newGravity = this.gravity + value;
    if (newGravity >= GRAVITY_VALUE_STEP && newGravity <= MAX_GRAVITY_VALUE) {
      this.gravity = newGravity;
      this.view.setGravity(this.gravity);
      this.gravityValueElement.textContent = this.gravity.toFixed(1);
      this.maxGravity.style.visibility =
        newGravity === MAX_GRAVITY_VALUE ? "visible" : "hidden";
    }
  }

  adjustShapesPerSecond(value) {
    const newShapesPerSecond = this.shapesPerSecond + value;
    if (
      newShapesPerSecond >= SHAPES_PER_SEC_STEP &&
      newShapesPerSecond <= MAX_SHAPES_VALUE
    ) {
      this.shapesPerSecond = newShapesPerSecond;
      this.shapesPerSecondElement.textContent = this.shapesPerSecond;
      this.maxShapes.style.visibility =
        newShapesPerSecond === MAX_SHAPES_VALUE ? "visible" : "hidden";
    }
  }
}
