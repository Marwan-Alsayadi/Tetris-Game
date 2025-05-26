// src/components/GameControls/GameControls.tsx
import React from "react";
import styled from "styled-components";
import { COLORS } from "../../utils/constants";

interface GameControlsProps {
  isPlaying: boolean;
  isPaused: boolean;
  isGameOver: boolean;
  onStart: () => void;
  onPause: () => void;
  onRestart: () => void;
}

const ControlsContainer = styled.div`
  background-color: #2a2a2a;
  border: 2px solid ${COLORS.BORDER};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Button = styled.button<{ variant?: "primary" | "secondary" | "danger" }>`
  padding: 12px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;

  ${(props) => {
    switch (props.variant) {
      case "primary":
        return `
          background-color: #4CAF50;
          color: white;
          &:hover:not(:disabled) {
            background-color: #45a049;
          }
        `;
      case "danger":
        return `
          background-color: #f44336;
          color: white;
          &:hover:not(:disabled) {
            background-color: #da190b;
          }
        `;
      default:
        return `
          background-color: #2196F3;
          color: white;
          &:hover:not(:disabled) {
            background-color: #1976D2;
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }
`;

const Instructions = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid ${COLORS.BORDER};
  color: #ccc;
  font-size: 12px;
  line-height: 1.4;
`;

const GameControls: React.FC<GameControlsProps> = ({
  isPlaying,
  isPaused,
  isGameOver,
  onStart,
  onPause,
  onRestart,
}) => {
  return (
    <ControlsContainer>
      <ButtonGroup>
        {!isPlaying && !isGameOver && (
          <Button variant="primary" onClick={onStart}>
            Start Game
          </Button>
        )}

        {isPlaying && !isGameOver && (
          <Button onClick={onPause}>{isPaused ? "Resume" : "Pause"}</Button>
        )}

        {(isPlaying || isGameOver) && (
          <Button variant="danger" onClick={onRestart}>
            {isGameOver ? "New Game" : "Restart"}
          </Button>
        )}
      </ButtonGroup>

      <Instructions>
        <strong>Controls:</strong>
        <br />
        ← → Move
        <br />
        ↓ Soft Drop
        <br />
        ↑ Rotate
        <br />
        Space Hard Drop
        <br />P Pause
      </Instructions>
    </ControlsContainer>
  );
};

export default GameControls;
