// src/styles/GlobalStyles.ts
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    min-height: 100vh;
    color: white;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  button:focus,
  div:focus {
    outline: 2px solid #4CAF50;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    #root {
      padding: 10px;
    }
  }
`;
