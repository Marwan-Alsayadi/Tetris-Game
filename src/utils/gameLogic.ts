// src/utils/gameLogic.ts
import type {
  Tetromino,
  TetrominoShape,
  Position,
  Direction,
} from "../types/tetris";
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  SCORES,
  INITIAL_DROP_TIME,
  LEVEL_DROP_TIME_DECREASE,
} from "./constants";
import { TETROMINO_NAMES, TETROMINOS } from "./tetrisPieces";

// Create empty board
export const createEmptyBoard = (): (string | null)[][] => {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => null)
  );
};

// Generate random tetromino
export const getRandomTetromino = (): TetrominoShape => {
  const randomIndex = Math.floor(Math.random() * TETROMINO_NAMES.length);
  const tetrominoName = TETROMINO_NAMES[randomIndex];
  return TETROMINOS[tetrominoName];
};

// Create new tetromino at spawn position
export const createTetromino = (shape: TetrominoShape): Tetromino => {
  return {
    ...shape,
    position: {
      x: Math.floor(BOARD_WIDTH / 2) - Math.floor(shape.shape[0].length / 2),
      y: 0,
    },
    rotation: 0,
  };
};

// Rotate matrix 90 degrees clockwise
export const rotateMatrix = (matrix: number[][]): number[][] => {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const rotated = Array.from({ length: cols }, () => Array(rows).fill(0));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      rotated[j][rows - 1 - i] = matrix[i][j];
    }
  }

  return rotated;
};

// Check if position is valid
export const isValidPosition = (
  board: (string | null)[][],
  tetromino: Tetromino,
  newPosition?: Position
): boolean => {
  const pos = newPosition || tetromino.position;

  for (let y = 0; y < tetromino.shape.length; y++) {
    for (let x = 0; x < tetromino.shape[y].length; x++) {
      if (tetromino.shape[y][x] !== 0) {
        const newX = pos.x + x;
        const newY = pos.y + y;

        // Check boundaries
        if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
          return false;
        }

        // Check collision with existing blocks (but allow negative Y for spawn)
        if (newY >= 0 && board[newY][newX] !== null) {
          return false;
        }
      }
    }
  }

  return true;
};

// Move tetromino
export const moveTetromino = (
  board: (string | null)[][],
  tetromino: Tetromino,
  direction: Direction
): Tetromino | null => {
  let newPosition: Position;

  switch (direction) {
    case "left":
      newPosition = { x: tetromino.position.x - 1, y: tetromino.position.y };
      break;
    case "right":
      newPosition = { x: tetromino.position.x + 1, y: tetromino.position.y };
      break;
    case "down":
      newPosition = { x: tetromino.position.x, y: tetromino.position.y + 1 };
      break;
    default:
      return tetromino;
  }

  if (isValidPosition(board, tetromino, newPosition)) {
    return { ...tetromino, position: newPosition };
  }

  return null;
};

// Rotate tetromino
export const rotateTetromino = (
  board: (string | null)[][],
  tetromino: Tetromino
): Tetromino | null => {
  const rotatedShape = rotateMatrix(tetromino.shape);
  const rotatedTetromino = {
    ...tetromino,
    shape: rotatedShape,
    rotation: (tetromino.rotation + 90) % 360,
  };

  if (isValidPosition(board, rotatedTetromino)) {
    return rotatedTetromino;
  }

  return null;
};

// Place tetromino on board
export const placeTetromino = (
  board: (string | null)[][],
  tetromino: Tetromino
): (string | null)[][] => {
  const newBoard = board.map((row) => [...row]);

  for (let y = 0; y < tetromino.shape.length; y++) {
    for (let x = 0; x < tetromino.shape[y].length; x++) {
      if (tetromino.shape[y][x] !== 0) {
        const boardX = tetromino.position.x + x;
        const boardY = tetromino.position.y + y;

        if (
          boardY >= 0 &&
          boardY < BOARD_HEIGHT &&
          boardX >= 0 &&
          boardX < BOARD_WIDTH
        ) {
          newBoard[boardY][boardX] = tetromino.color;
        }
      }
    }
  }

  return newBoard;
};

// Clear completed lines
export const clearLines = (
  board: (string | null)[][]
): {
  newBoard: (string | null)[][];
  linesCleared: number;
} => {
  const linesToClear: number[] = [];

  // Find completed lines
  for (let y = 0; y < BOARD_HEIGHT; y++) {
    if (board[y].every((cell) => cell !== null)) {
      linesToClear.push(y);
    }
  }

  if (linesToClear.length === 0) {
    return { newBoard: board, linesCleared: 0 };
  }

  // Remove completed lines and add empty lines at top
  const newBoard = board.filter((_, index) => !linesToClear.includes(index));

  // Add empty lines at the top
  for (let i = 0; i < linesToClear.length; i++) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(null));
  }

  return { newBoard, linesCleared: linesToClear.length };
};

// Calculate score
export const calculateScore = (linesCleared: number, level: number): number => {
  switch (linesCleared) {
    case 1:
      return SCORES.SINGLE * (level + 1);
    case 2:
      return SCORES.DOUBLE * (level + 1);
    case 3:
      return SCORES.TRIPLE * (level + 1);
    case 4:
      return SCORES.TETRIS * (level + 1);
    default:
      return 0;
  }
};

// Calculate drop time based on level
export const getDropTime = (level: number): number => {
  return Math.max(50, INITIAL_DROP_TIME - level * LEVEL_DROP_TIME_DECREASE);
};

// Check if game is over
export const isGameOver = (
  board: (string | null)[][],
  tetromino: Tetromino
): boolean => {
  return !isValidPosition(board, tetromino);
};

// Get ghost piece position (preview where piece will land)
export const getGhostPosition = (
  board: (string | null)[][],
  tetromino: Tetromino
): Position => {
  let ghostY = tetromino.position.y;

  while (
    isValidPosition(board, tetromino, {
      x: tetromino.position.x,
      y: ghostY + 1,
    })
  ) {
    ghostY++;
  }

  return { x: tetromino.position.x, y: ghostY };
};

// Hard drop (instantly drop to bottom)
export const hardDrop = (
  board: (string | null)[][],
  tetromino: Tetromino
): { tetromino: Tetromino; dropDistance: number } => {
  const ghostPosition = getGhostPosition(board, tetromino);
  const dropDistance = ghostPosition.y - tetromino.position.y;

  return {
    tetromino: { ...tetromino, position: ghostPosition },
    dropDistance,
  };
};
