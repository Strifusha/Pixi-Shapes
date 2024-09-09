export const INITIAL_SHAPES_COUNTER = 0;
export const INITIAL_SURFACE_AREA = 0;
export const SHAPES_PER_SEC_STEP = 1;
export const GRAVITY_VALUE_STEP = 0.5;
export const MAX_GRAVITY_VALUE = 5;
export const MAX_SHAPES_VALUE = 10;
export const BRIGHTNESS_VALUE = 1.5;
export const MAX_X_COORDINATE = 370;
export const WHITE_COLOR_HEX = 0xffffff;
export const DEFAULT_SHAPE_SIZE = 100;

export const SHAPE_TYPES = {
  TRIANGLE: "triangle",
  SQUARE: "square",
  PENTAGON: "pentagon",
  HEXAGON: "hexagon",
  CIRCLE: "circle",
  ELLIPSE: "ellipse",
  RANDOM_POLYGON: "random_polygon",
};

export const EVENT_TYPES = {
  POINTER_DOWN: "pointerdown",
  POINTER_OVER: "pointerover",
  POINTER_OUT: "pointerout",
};

export const CANVAS = {
  CONTAINER_ID: "canvas-container",
  WIDTH: 800,
  HEIGHT: 500,
};

export const ELEMENT_IDS = {
  SHAPE_COUNT: "shapeCount",
  SURFACE_AREA: "surfaceArea",
  SHAPES_PER_SECOND: "shapesPerSecondValue",
  MAX_SHAPES: "maxShapes",
  GRAVITY_VALUE: "gravityValue",
  MAX_GRAVITY: "maxGravity",
  CANVAS_CONTAINER: "canvas-container",
  INCREASE_GRAVITY: "increaseGravity",
  DECREASE_GRAVITY: "decreaseGravity",
  INCREASE_SHAPES: "increaseShapes",
  DECREASE_SHAPES: "decreaseShapes",
};
