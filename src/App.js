import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { LightTheme } from "./components/Theme";
import Home from "./pages/Home";
import { Bar, BarSVG, BarItems, NavLink } from "./components/Bar";
import GithubSVG from "./svg/github.svg";
import TwitterSVG from "./svg/twitter.svg";
import DiscordSVG from "./svg/discord.svg";
import LinkedInSVG from "./svg/linkedin.svg";
import { Routes, Route } from "react-router-dom";
import Mint from "./pages/Mint";
import { EthersStateProvider } from "./hooks/useEthers";

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
        <Bar left={left} right={right} name={""} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/mint"
            element={
              <EthersStateProvider>
                <Mint />
              </EthersStateProvider>
            }
          />
        </Routes>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
