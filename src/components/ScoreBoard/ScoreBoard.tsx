// src/components/ScoreBoard/ScoreBoard.tsx
import React from "react";
import styled from "styled-components";
import { COLORS } from "../../utils/constants";

interface ScoreBoardProps {
  score: number;
  level: number;
  lines: number;
}

const ScoreBoardContainer = styled.div`
  background-color: #2a2a2a;
  border: 2px solid ${COLORS.BORDER};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  color: white;
`;

const ScoreItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  color: #ccc;
`;

const Value = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, level, lines }) => {
  return (
    <ScoreBoardContainer>
      <ScoreItem>
        <Label>Score</Label>
        <Value>{score.toLocaleString()}</Value>
      </ScoreItem>
      <ScoreItem>
        <Label>Level</Label>
        <Value>{level}</Value>
      </ScoreItem>
      <ScoreItem>
        <Label>Lines</Label>
        <Value>{lines}</Value>
      </ScoreItem>
    </ScoreBoardContainer>
  );
};

export default ScoreBoard;
