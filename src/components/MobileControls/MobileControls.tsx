// src/components/MobileControls/MobileControls.tsx
import React from "react";
import type { Direction } from "../../types/tetris";
import styled from "styled-components";

interface MobileControlsProps {
  onMove: (direction: Direction) => void;
  onRotate: () => void;
  onHardDrop: () => void;
  onPause: () => void;
  isPlaying: boolean;
  isPaused: boolean;
}

const MobileControlsContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 1000;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const MobileControls: React.FC<MobileControlsProps> = ({
  onMove,
  onRotate,
  onHardDrop,
  onPause,
  isPlaying,
  isPaused,
}) => {
  const buttonStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "12px",
    color: "#ffffff",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    userSelect: "none" as const,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    touchAction: "manipulation",
  };

  //   const activeButtonStyle = {
  //     ...buttonStyle,
  //     backgroundColor: "rgba(255, 255, 255, 0.2)",
  //     transform: "scale(0.95)",
  //   };

  return (
    <MobileControlsContainer className="mobile-controls">
      {/* Top Row - Rotate and Hard Drop */}
      <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        <button
          style={{ ...buttonStyle, width: "60px", height: "60px" }}
          onTouchStart={(e) => {
            e.preventDefault();
            if (isPlaying && !isPaused) onRotate();
          }}
          disabled={!isPlaying || isPaused}
        >
          ↻
        </button>
        <button
          style={{ ...buttonStyle, width: "60px", height: "60px" }}
          onTouchStart={(e) => {
            e.preventDefault();
            if (isPlaying && !isPaused) onHardDrop();
          }}
          disabled={!isPlaying || isPaused}
        >
          ⬇
        </button>
        <button
          style={{ ...buttonStyle, width: "60px", height: "60px" }}
          onTouchStart={(e) => {
            e.preventDefault();
            onPause();
          }}
        >
          {isPaused ? "▶" : "⏸"}
        </button>
      </div>

      {/* Bottom Row - Movement Controls */}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        {/* Left Arrow */}
        <button
          style={{ ...buttonStyle, width: "50px", height: "50px" }}
          onTouchStart={(e) => {
            e.preventDefault();
            if (isPlaying && !isPaused) onMove("left");
          }}
          disabled={!isPlaying || isPaused}
        >
          ←
        </button>

        {/* Down Arrow */}
        <button
          style={{ ...buttonStyle, width: "50px", height: "50px" }}
          onTouchStart={(e) => {
            e.preventDefault();
            if (isPlaying && !isPaused) onMove("down");
          }}
          disabled={!isPlaying || isPaused}
        >
          ↓
        </button>

        {/* Right Arrow */}
        <button
          style={{ ...buttonStyle, width: "50px", height: "50px" }}
          onTouchStart={(e) => {
            e.preventDefault();
            if (isPlaying && !isPaused) onMove("right");
          }}
          disabled={!isPlaying || isPaused}
        >
          →
        </button>
      </div>

      {/* Control Labels */}
      <div
        style={{
          textAlign: "center",
          color: "rgba(255, 255, 255, 0.7)",
          fontSize: "12px",
          marginTop: "5px",
        }}
      >
        <div>↻ Rotate | ⬇ Drop | ⏸ Pause</div>
        <div>← → Move | ↓ Soft Drop</div>
      </div>

      <style>{`
        .mobile-controls {
          display: flex;
        }

        @media (min-width: 768px) {
          .mobile-controls {
            display: none !important;
          }
        }

        .mobile-controls button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .mobile-controls button:active:not(:disabled) {
          background-color: rgba(255, 255, 255, 0.3) !important;
          transform: scale(0.9) !important;
        }
      `}</style>
    </MobileControlsContainer>
  );
};
