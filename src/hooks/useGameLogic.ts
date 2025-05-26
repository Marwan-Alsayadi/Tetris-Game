// src/hooks/useGameLogic.ts
import { useState, useEffect, useCallback, useRef } from "react";
import type { GameState, Direction } from "../types/tetris";
import {
  createEmptyBoard,
  getRandomTetromino,
  createTetromino,
  moveTetromino,
  rotateTetromino,
  placeTetromino,
  clearLines,
  calculateScore,
  getDropTime,
  isGameOver,
  hardDrop,
} from "../utils/gameLogic";
import { LINES_PER_LEVEL } from "../utils/constants";

export const useGameLogic = () => {
  // Game state
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPiece: null,
    nextPiece: null,
    score: 0,
    level: 0,
    lines: 0,
    isGameOver: false,
    isPaused: false,
    isPlaying: false,
  });

  // Refs for intervals - Fixed type for Vercel deployment
  const dropIntervalRef = useRef<number | null>(null);
  // const lastDropTimeRef = useRef<number>(0);

  // Initialize next piece
  const initializeNextPiece = useCallback(() => {
    return getRandomTetromino();
  }, []);

  // Spawn new piece
  const spawnNewPiece = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (board: (string | null)[][], nextPiece: any) => {
      const newPiece = createTetromino(nextPiece);
      const newNextPiece = getRandomTetromino();

      // Check if game is over
      if (isGameOver(board, newPiece)) {
        return {
          currentPiece: newPiece,
          nextPiece: newNextPiece,
          isGameOver: true,
          isPlaying: false,
        };
      }

      return {
        currentPiece: newPiece,
        nextPiece: newNextPiece,
        isGameOver: false,
      };
    },
    []
  );

  // Drop piece down
  const dropPiece = useCallback(() => {
    setGameState((prevState) => {
      if (
        !prevState.isPlaying ||
        prevState.isPaused ||
        prevState.isGameOver ||
        !prevState.currentPiece
      ) {
        return prevState;
      }

      const movedPiece = moveTetromino(
        prevState.board,
        prevState.currentPiece,
        "down"
      );

      if (movedPiece) {
        // Piece can move down
        return {
          ...prevState,
          currentPiece: movedPiece,
        };
      } else {
        // Piece cannot move down, place it and spawn new piece
        const newBoard = placeTetromino(
          prevState.board,
          prevState.currentPiece
        );
        const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);

        const newLines = prevState.lines + linesCleared;
        const newLevel = Math.floor(newLines / LINES_PER_LEVEL);
        const newScore =
          prevState.score + calculateScore(linesCleared, prevState.level);

        const spawnResult = spawnNewPiece(clearedBoard, prevState.nextPiece);

        return {
          ...prevState,
          board: clearedBoard,
          currentPiece: spawnResult.currentPiece,
          nextPiece: spawnResult.nextPiece,
          score: newScore,
          level: newLevel,
          lines: newLines,
          isGameOver: spawnResult.isGameOver || false,
          isPlaying: !(spawnResult.isGameOver || false),
        };
      }
    });
  }, [spawnNewPiece]);

  // Move piece
  const move = useCallback((direction: Direction) => {
    setGameState((prevState) => {
      if (
        !prevState.isPlaying ||
        prevState.isPaused ||
        prevState.isGameOver ||
        !prevState.currentPiece
      ) {
        return prevState;
      }

      const movedPiece = moveTetromino(
        prevState.board,
        prevState.currentPiece,
        direction
      );

      if (movedPiece) {
        let newScore = prevState.score;

        // Add soft drop points
        if (direction === "down") {
          newScore += 1;
        }

        return {
          ...prevState,
          currentPiece: movedPiece,
          score: newScore,
        };
      }

      return prevState;
    });
  }, []);

  // Rotate piece
  const rotate = useCallback(() => {
    setGameState((prevState) => {
      if (
        !prevState.isPlaying ||
        prevState.isPaused ||
        prevState.isGameOver ||
        !prevState.currentPiece
      ) {
        return prevState;
      }

      const rotatedPiece = rotateTetromino(
        prevState.board,
        prevState.currentPiece
      );

      if (rotatedPiece) {
        return {
          ...prevState,
          currentPiece: rotatedPiece,
        };
      }

      return prevState;
    });
  }, []);

  // Hard drop
  const performHardDrop = useCallback(() => {
    setGameState((prevState) => {
      if (
        !prevState.isPlaying ||
        prevState.isPaused ||
        prevState.isGameOver ||
        !prevState.currentPiece
      ) {
        return prevState;
      }

      const { tetromino: droppedPiece, dropDistance } = hardDrop(
        prevState.board,
        prevState.currentPiece
      );
      const newBoard = placeTetromino(prevState.board, droppedPiece);
      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);

      const newLines = prevState.lines + linesCleared;
      const newLevel = Math.floor(newLines / LINES_PER_LEVEL);
      const hardDropScore = dropDistance * 2;
      const lineScore = calculateScore(linesCleared, prevState.level);
      const newScore = prevState.score + hardDropScore + lineScore;

      const spawnResult = spawnNewPiece(clearedBoard, prevState.nextPiece);

      return {
        ...prevState,
        board: clearedBoard,
        currentPiece: spawnResult.currentPiece,
        nextPiece: spawnResult.nextPiece,
        score: newScore,
        level: newLevel,
        lines: newLines,
        isGameOver: spawnResult.isGameOver || false,
        isPlaying: !(spawnResult.isGameOver || false),
      };
    });
  }, [spawnNewPiece]);

  // Start game
  const startGame = useCallback(() => {
    const nextPiece = initializeNextPiece();
    const board = createEmptyBoard();
    const spawnResult = spawnNewPiece(board, nextPiece);

    setGameState({
      board,
      currentPiece: spawnResult.currentPiece,
      nextPiece: spawnResult.nextPiece,
      score: 0,
      level: 0,
      lines: 0,
      isGameOver: false,
      isPaused: false,
      isPlaying: true,
    });
  }, [initializeNextPiece, spawnNewPiece]);

  // Pause/Resume game
  const togglePause = useCallback(() => {
    setGameState((prevState) => ({
      ...prevState,
      isPaused: !prevState.isPaused,
    }));
  }, []);

  // Restart game
  const restartGame = useCallback(() => {
    startGame();
  }, [startGame]);

  // Game loop effect
  useEffect(() => {
    if (gameState.isPlaying && !gameState.isPaused && !gameState.isGameOver) {
      const dropTime = getDropTime(gameState.level);

      dropIntervalRef.current = window.setInterval(() => {
        dropPiece();
      }, dropTime);

      return () => {
        if (dropIntervalRef.current) {
          window.clearInterval(dropIntervalRef.current);
        }
      };
    } else {
      if (dropIntervalRef.current) {
        window.clearInterval(dropIntervalRef.current);
      }
    }
  }, [
    gameState.isPlaying,
    gameState.isPaused,
    gameState.isGameOver,
    gameState.level,
    dropPiece,
  ]);

  // Keyboard controls effect
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!gameState.isPlaying || gameState.isGameOver) return;

      switch (event.code) {
        case "ArrowLeft":
          event.preventDefault();
          move("left");
          break;
        case "ArrowRight":
          event.preventDefault();
          move("right");
          break;
        case "ArrowDown":
          event.preventDefault();
          move("down");
          break;
        case "ArrowUp":
          event.preventDefault();
          rotate();
          break;
        case "Space":
          event.preventDefault();
          performHardDrop();
          break;
        case "KeyP":
          event.preventDefault();
          togglePause();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [
    gameState.isPlaying,
    gameState.isGameOver,
    move,
    rotate,
    performHardDrop,
    togglePause,
  ]);

  return {
    gameState,
    actions: {
      startGame,
      togglePause,
      restartGame,
      move,
      rotate,
      hardDrop: performHardDrop,
    },
  };
};
