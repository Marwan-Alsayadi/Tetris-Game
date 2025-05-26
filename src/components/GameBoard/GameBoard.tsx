// src/components/GameBoard/GameBoard.tsx
import React from "react";
import styled from "styled-components";
import type { Tetromino } from "../../types/tetris";
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  GRID_SIZE,
  COLORS,
} from "../../utils/constants";
import { getGhostPosition } from "../../utils/gameLogic";

interface GameBoardProps {
  board: (string | null)[][];
  currentPiece: Tetromino | null;
  showGhost?: boolean;
}

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${BOARD_WIDTH}, ${GRID_SIZE}px);
  grid-template-rows: repeat(${BOARD_HEIGHT}, ${GRID_SIZE}px);
  gap: 1px;
  background-color: ${COLORS.BORDER};
  border: 2px solid ${COLORS.BORDER};
  border-radius: 4px;
  padding: 2px;
`;

const Cell = styled.div<{ color: string; isGhost?: boolean }>`
  width: ${GRID_SIZE}px;
  height: ${GRID_SIZE}px;
  background-color: ${(props) => props.color};
  border: ${(props) => (props.isGhost ? `1px dashed ${COLORS.GHOST}` : "none")};
  opacity: ${(props) => (props.isGhost ? 0.3 : 1)};
  transition: background-color 0.1s ease;
`;

const GameBoard: React.FC<GameBoardProps> = ({
  board,
  currentPiece,
  showGhost = true,
}) => {
  // Create a copy of the board to render
  const renderBoard = board.map((row) => [...row]);

  // Add current piece to render board
  if (currentPiece) {
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x] !== 0) {
          const boardX = currentPiece.position.x + x;
          const boardY = currentPiece.position.y + y;

          if (
            boardY >= 0 &&
            boardY < BOARD_HEIGHT &&
            boardX >= 0 &&
            boardX < BOARD_WIDTH
          ) {
            renderBoard[boardY][boardX] = currentPiece.color;
          }
        }
      }
    }
  }

  // Add ghost piece
  const ghostCells: boolean[][] = Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => false)
  );

  if (showGhost && currentPiece) {
    const ghostPosition = getGhostPosition(board, currentPiece);

    // Only show ghost if it's different from current position
    if (ghostPosition.y !== currentPiece.position.y) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x] !== 0) {
            const boardX = ghostPosition.x + x;
            const boardY = ghostPosition.y + y;

            if (
              boardY >= 0 &&
              boardY < BOARD_HEIGHT &&
              boardX >= 0 &&
              boardX < BOARD_WIDTH
            ) {
              // Only show ghost where there's no current piece or existing block
              if (renderBoard[boardY][boardX] === null) {
                ghostCells[boardY][boardX] = true;
              }
            }
          }
        }
      }
    }
  }

  return (
    <BoardContainer>
      {renderBoard.flat().map((cell, index) => {
        const row = Math.floor(index / BOARD_WIDTH);
        const col = index % BOARD_WIDTH;
        const isGhost = ghostCells[row][col];
        const cellColor = cell || (isGhost ? COLORS.GHOST : COLORS.EMPTY);

        return <Cell key={index} color={cellColor} isGhost={isGhost} />;
      })}
    </BoardContainer>
  );
};

export default GameBoard;
