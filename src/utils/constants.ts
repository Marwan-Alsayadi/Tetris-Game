// src/utils/constants.ts
export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const GRID_SIZE = 30;

export const COLORS = {
  I: "#00f5ff", // Cyan
  O: "#ffff00", // Yellow
  T: "#800080", // Purple
  S: "#00ff00", // Green
  Z: "#ff0000", // Red
  J: "#0000ff", // Blue
  L: "#ffa500", // Orange
  GHOST: "#333333", // Ghost piece
  EMPTY: "#1a1a1a", // Empty cell
  BORDER: "#444444", // Border
};

export const INITIAL_DROP_TIME = 1000; // milliseconds
export const LINES_PER_LEVEL = 10;
export const LEVEL_DROP_TIME_DECREASE = 100;

export const SCORES = {
  SINGLE: 100,
  DOUBLE: 300,
  TRIPLE: 500,
  TETRIS: 800,
  SOFT_DROP: 1,
  HARD_DROP: 2,
};
