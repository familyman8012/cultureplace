/** @jsxImportSource @emotion/react */
import { jsx, ThemeProvider } from "@emotion/react";
import React from "react";
import styled from "@emotion/styled";
import ButtonEM from "../src/components/elements/sample/ButtonEM";

const AppBlock = styled.div`
  width: 512px;
  margin: 0 auto;
  margin-top: 4rem;
  border: 1px solid black;
  padding: 1rem;
`;

const ButtonGroup = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

function Emotion() {
  return (
    <ThemeProvider
      theme={{
        palette: {
          blue: "#228be6",
          gray: "#495057",
          pink: "#f06595",
        },
      }}
    >
      <AppBlock>
        <ButtonGroup>
          <ButtonEM size="large">BUTTON</ButtonEM>
          <ButtonEM>BUTTON</ButtonEM>
          <ButtonEM size="small">BUTTON</ButtonEM>
        </ButtonGroup>
        <ButtonGroup>
          <ButtonEM color="gray" size="large">
            BUTTON
          </ButtonEM>
          <ButtonEM color="gray">BUTTON</ButtonEM>
          <ButtonEM color="gray" size="small">
            BUTTON
          </ButtonEM>
        </ButtonGroup>
        <ButtonGroup>
          <ButtonEM color="pink" size="large">
            BUTTON
          </ButtonEM>
          <ButtonEM color="pink">BUTTON</ButtonEM>
          <ButtonEM color="pink" size="small">
            BUTTON
          </ButtonEM>
        </ButtonGroup>
      </AppBlock>
    </ThemeProvider>
  );
}

export default Emotion;
