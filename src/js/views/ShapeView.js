import * as PIXI from "pixi.js";
import { ColorMatrixFilter } from "pixi.js";
import { getRandomColor } from "../../utils/randomGenerators";
import {
  EVENT_TYPES,
  CANVAS,
  GRAVITY_VALUE_STEP,
  BRIGHTNESS_VALUE,
} from "../../utils/constants";

export default class ShapeView {
  constructor(controller) {
    this.app = null;
    this.shapes = [];
    this.gravity = GRAVITY_VALUE_STEP;
    this.controller = controller;
  }

  async init() {
    this.app = new PIXI.Application();

    await this.app.init({
      width: CANVAS.WIDTH,
      height: CANVAS.HEIGHT,
    });

    document.getElementById(CANVAS.CONTAINER_ID).appendChild(this.app.canvas);
    this.app.stage.interactive = true;

    // Start the game loop
    this.app.ticker.add(this.update.bind(this));
  }

  setGravity(newGravity) {
    this.gravity = newGravity;
  }

  createShape(shapeModel) {
    let shape = new PIXI.Graphics();
    shapeModel.drawShape(shape);

    shape.interactive = true;
    shape.buttonMode = true;

    this.shapes.push({ shape, model: shapeModel });
    this.app.stage.addChild(shape);
    this.controller.updateVisualization();

    this.addShapeEvents(shape);
  }

  // Add events like hover and click to the shape
  addShapeEvents(shape) {
    const brightnessFilter = new ColorMatrixFilter();

    shape.on(EVENT_TYPES.POINTER_DOWN, () => {
      event.stopPropagation();
      this.changeShapeColor(shape);
    });

    shape.on(EVENT_TYPES.POINTER_OVER, () => {
      shape.filters = [brightnessFilter];
      brightnessFilter.brightness(BRIGHTNESS_VALUE, false);
    });

    shape.on(EVENT_TYPES.POINTER_OUT, () => {
      shape.filters = null;
    });
  }

  changeShapeColor(shape) {
    const shapeToRemove = this.shapes.find((s) => s.shape === shape);
    if (!shapeToRemove) return;

    // Change a color of all other similar shapes on canvas
    for (const s of this.shapes) {
      if (
        s.model.constructor.name === shapeToRemove.model.constructor.name &&
        this.app.stage.children.includes(s.shape)
      ) {
        s.shape.tint = getRandomColor();
      }
    }

    this.removeShape(shape);
  }

  removeShape(shape) {
    this.app.stage.removeChild(shape);
    this.shapes = this.shapes.filter((s) => s.shape !== shape);
    this.controller.updateVisualization();
  }

  update() {
    for (const { shape, model } of this.shapes) {
      model.position.y += this.gravity;
      shape.position.set(model.position.x, model.position.y);

      // Remove shape if it goes out of canvas bounds
      if (model.position.y > this.app.canvas.height + model.size) {
        this.removeShape(shape);
      }
    }
  }
}
