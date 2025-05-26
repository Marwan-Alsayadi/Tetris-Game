// src/App.tsx
import React from "react";
import styled from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { useGameLogic } from "./hooks/useGameLogic";
import GameBoard from "./components/GameBoard";
import NextPiece from "./components/NextPiece";
import ScoreBoard from "./components/ScoreBoard";
import GameControls from "./components/GameControls";

const AppContainer = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;
  max-width: 1200px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
`;

const GameArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;

  @media (max-width: 768px) {
    min-width: unset;
    width: 100%;
    max-width: 300px;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 16px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 12px;
  }
`;

const GameOverlay = styled.div<{ show: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: ${(props) => (props.show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 10;
  border-radius: 4px;
`;

const GameOverText = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #ff6b6b;
  text-align: center;
  margin-bottom: 16px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
`;

const PausedText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4ecdc4;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
`;

const GameBoardContainer = styled.div`
  position: relative;
`;

const App: React.FC = () => {
  const { gameState, actions } = useGameLogic();

  const {
    board,
    currentPiece,
    nextPiece,
    score,
    level,
    lines,
    isGameOver,
    isPaused,
    isPlaying,
  } = gameState;

  const { startGame, togglePause, restartGame } = actions;

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <GameArea>
          <Title>TETRIS</Title>
          <GameBoardContainer>
            <GameBoard
              board={board}
              currentPiece={currentPiece}
              showGhost={true}
            />
            <GameOverlay show={isGameOver}>
              <GameOverText>GAME OVER</GameOverText>
              <div style={{ color: "#ccc", fontSize: "1.2rem" }}>
                Final Score: {score.toLocaleString()}
              </div>
            </GameOverlay>
            <GameOverlay show={isPaused && isPlaying}>
              <PausedText>PAUSED</PausedText>
            </GameOverlay>
          </GameBoardContainer>
        </GameArea>

        <SidePanel>
          <NextPiece nextPiece={nextPiece} />
          <ScoreBoard score={score} level={level} lines={lines} />
          <GameControls
            isPlaying={isPlaying}
            isPaused={isPaused}
            isGameOver={isGameOver}
            onStart={startGame}
            onPause={togglePause}
            onRestart={restartGame}
          />
        </SidePanel>
      </AppContainer>
    </>
  );
};

export default App;
