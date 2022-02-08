import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { LightTheme } from "./components/Theme";
import Home from "./pages/Home";
import { Bar, BarSVG, BarItems, NavLink } from "./components/Bar";
import GithubSVG from "./svg/github.svg";
import TwitterSVG from "./svg/twitter.svg";
import DiscordSVG from "./svg/discord.svg";
import LinkedInSVG from "./svg/linkedin.svg";
import { Routes, Route } from "react-router-dom";
import Mint from "./pages/Mint";
import { EthereumStateProvider } from "./providers/ethereum";

const AppContainer = styled.div`
  margin: 0;
  width: 100%;
  height: 100vh;
  background: ${(props) => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

function App() {
  const [centerContent, setCenterContent] = useState(null);
  const left = (
    <BarItems left>
      <NavLink to="/"> / </NavLink>
      <NavLink to="/mint"> /mint </NavLink>
    </BarItems>
  );
  const right = (
    <BarItems>
      <a
        href="https://www.linkedin.com/in/john-mcclure-b1923ab6/"
        target="_blank"
        rel="noreferrer"
      >
        <BarSVG src={LinkedInSVG} />
      </a>
      <a href="https://github.com/mcclurejt" target="_blank" rel="noreferrer">
        <BarSVG src={GithubSVG} />
      </a>
      <a
        href="https://discordapp.com/users/mcclurejt#3268"
        target="_blank"
        rel="noreferrer"
      >
        <BarSVG src={DiscordSVG} />
      </a>
      <a href="https://twitter.com/mcclurejit" target="_blank" rel="noreferrer">
        <BarSVG src={TwitterSVG} />
      </a>
    </BarItems>
  );
  return (
    <ThemeProvider theme={LightTheme}>
      <AppContainer>
        <Bar left={left} right={right} center={centerContent} />
        <Routes>
          <Route
            path="/"
            element={<Home setCenterContent={setCenterContent} />}
          />
          <Route
            path="/mint"
            element={
              <EthereumStateProvider>
                <Mint setCenterContent={setCenterContent} />
              </EthereumStateProvider>
            }
          />
        </Routes>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
