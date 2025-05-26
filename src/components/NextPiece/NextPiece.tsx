// src/components/NextPiece/NextPiece.tsx
import React from "react";
import styled from "styled-components";
import type { TetrominoShape } from "../../types/tetris";
import { GRID_SIZE, COLORS } from "../../utils/constants";

interface NextPieceProps {
  nextPiece: TetrominoShape | null;
}

const NextPieceContainer = styled.div`
  background-color: #2a2a2a;
  border: 2px solid ${COLORS.BORDER};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 4px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h3`
  color: white;
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

const PieceGrid = styled.div<{ rows: number; cols: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.cols}, ${GRID_SIZE - 5}px);
  grid-template-rows: repeat(${(props) => props.rows}, ${GRID_SIZE - 5}px);
  gap: 1px;
  justify-content: center;
`;

const PieceCell = styled.div<{ color: string }>`
  width: ${GRID_SIZE - 5}px;
  height: ${GRID_SIZE - 5}px;
  background-color: ${(props) => props.color};
  border-radius: 2px;
`;

const NextPiece: React.FC<NextPieceProps> = ({ nextPiece }) => {
  if (!nextPiece) {
    return (
      <NextPieceContainer>
        <Title>NEXT</Title>
        <div style={{ color: "#666", fontSize: "14px" }}>No piece</div>
      </NextPieceContainer>
    );
  }

  const { shape, color } = nextPiece;
  const rows = shape.length;
  const cols = shape[0].length;

  return (
    <NextPieceContainer>
      <Title>NEXT</Title>
      <PieceGrid rows={rows} cols={cols}>
        {shape.flat().map((cell, index) => (
          <PieceCell key={index} color={cell === 1 ? color : "transparent"} />
        ))}
      </PieceGrid>
    </NextPieceContainer>
  );
};

export default NextPiece;
