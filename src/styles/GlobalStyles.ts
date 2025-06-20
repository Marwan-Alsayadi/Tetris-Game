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
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: white;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
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
