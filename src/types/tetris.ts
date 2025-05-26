// src/types/tetris.ts
export interface Position {
  x: number;
  y: number;
}

export interface TetrominoShape {
  shape: number[][];
  color: string;
}

export interface Tetromino extends TetrominoShape {
  position: Position;
  rotation: number;
}

export interface GameState {
  board: (string | null)[][];
  currentPiece: Tetromino | null;
  nextPiece: TetrominoShape | null;
  score: number;
  level: number;
  lines: number;
  isGameOver: boolean;
  isPaused: boolean;
  isPlaying: boolean;
}

export type Direction = "left" | "right" | "down";
