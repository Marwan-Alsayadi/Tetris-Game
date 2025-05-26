// src/App.tsx
import React from "react";
import { useGameLogic } from "./hooks/useGameLogic";
import GameBoard from "./components/GameBoard/GameBoard";
import NextPiece from "./components/NextPiece/NextPiece";
import ScoreBoard from "./components/ScoreBoard/ScoreBoard";
import GameControls from "./components/GameControls/GameControls";
import { MobileControls } from "./components/MobileControls/MobileControls";
import { GlobalStyles } from "./styles/GlobalStyles";
import useMediaQuery from "./hooks/useMediaQuery";

const App: React.FC = () => {
  const { gameState, actions } = useGameLogic();
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <>
      <GlobalStyles />
      <div
        style={{
          minHeight: "100vh",
          // background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // padding: "20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "30px",
            alignItems: "flex-start",
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: "1200px",
            width: "100%",
          }}
        >
          {/* Left Panel - Next Piece and Score */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              minWidth: "200px",
            }}
          >
            {isMobile && (
              <h4
                style={{
                  color: "#ffffff",
                  textAlign: "center",
                  margin: "0",
                  fontSize: "1.5rem",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                React Tetris
              </h4>
            )}
            <NextPiece nextPiece={gameState.nextPiece} />
            {!isMobile && (
              <ScoreBoard
                score={gameState.score}
                level={gameState.level}
                lines={gameState.lines}
              />
            )}
          </div>

          {/* Center - Game Board */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {!isMobile && (
              <h1
                style={{
                  color: "#ffffff",
                  textAlign: "center",
                  margin: "0",
                  fontSize: "2.5rem",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                React Tetris
              </h1>
            )}

            <GameBoard
              board={gameState.board}
              currentPiece={gameState.currentPiece}
              showGhost={true}
            />

            {/* Game Over Overlay */}
            {gameState.isGameOver && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  color: "#ffffff",
                  padding: "30px",
                  borderRadius: "15px",
                  textAlign: "center",
                  zIndex: 1000,
                }}
              >
                <h2 style={{ margin: "0 0 20px 0", fontSize: "2rem" }}>
                  Game Over!
                </h2>
                <p style={{ margin: "0 0 20px 0", fontSize: "1.2rem" }}>
                  Final Score: {gameState.score}
                </p>
                <button
                  onClick={actions.restartGame}
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    fontSize: "1.1rem",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#45a049")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#4CAF50")
                  }
                >
                  Play Again
                </button>
              </div>
            )}

            {/* Pause Overlay */}
            {gameState.isPaused && gameState.isPlaying && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  color: "#ffffff",
                  padding: "30px",
                  borderRadius: "15px",
                  textAlign: "center",
                  zIndex: 1000,
                }}
              >
                <h2 style={{ margin: "0 0 20px 0", fontSize: "2rem" }}>
                  Paused
                </h2>
                <p style={{ margin: "0", fontSize: "1.1rem" }}>
                  Press P or tap Resume to continue
                </p>
              </div>
            )}
          </div>

          {/* Right Panel - Controls and Instructions */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              minWidth: "200px",
            }}
          >
            <GameControls
              onStart={actions.startGame}
              onPause={actions.togglePause}
              onRestart={actions.restartGame}
              isPlaying={gameState.isPlaying}
              isPaused={gameState.isPaused}
              isGameOver={gameState.isGameOver}
            />

            {/* Desktop Controls Info */}
            {!isMobile && (
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "15px",
                  padding: "20px",
                  color: "#ffffff",
                }}
              >
                <h3 style={{ margin: "0 0 15px 0", fontSize: "1.2rem" }}>
                  Controls
                </h3>
                <div style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
                  <div>
                    <strong>←/→</strong> Move
                  </div>
                  <div>
                    <strong>↓</strong> Soft Drop
                  </div>
                  <div>
                    <strong>↑</strong> Rotate
                  </div>
                  <div>
                    <strong>Space</strong> Hard Drop
                  </div>
                  <div>
                    <strong>P</strong> Pause
                  </div>
                  <div>
                    <strong>R</strong> Restart
                  </div>
                </div>
              </div>
            )}

            {/* Scoring Info */}
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "15px",
                padding: "20px",
                color: "#ffffff",
              }}
            >
              <h3 style={{ margin: "0 0 15px 0", fontSize: "1.2rem" }}>
                Scoring
              </h3>
              <div style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
                <div>
                  <strong>1 Line:</strong> 100 × Level
                </div>
                <div>
                  <strong>2 Lines:</strong> 300 × Level
                </div>
                <div>
                  <strong>3 Lines:</strong> 500 × Level
                </div>
                <div>
                  <strong>4 Lines:</strong> 800 × Level
                </div>
                <div>
                  <strong>Soft Drop:</strong> 1 point
                </div>
                <div>
                  <strong>Hard Drop:</strong> 2 × distance
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Controls - Only visible on mobile */}
        <MobileControls
          onMove={actions.move}
          onRotate={actions.rotate}
          onHardDrop={actions.hardDrop}
          onPause={actions.togglePause}
          isPlaying={gameState.isPlaying}
          isPaused={gameState.isPaused}
        />
      </div>
    </>
  );
};

export default App;
