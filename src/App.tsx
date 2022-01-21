import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./routes/Home";
import Experience from "./routes/Experience";
import styled from "styled-components";
import Title from "./components/Title";

const AppContainer = styled.div`
  background-color: #ececec;
  min-height: 100vh;
`;

function App() {
  return (
    <AppContainer>
      <Router>
        <Title
          style={{
            background: "linear-gradient(45deg, #00b2ff, #ff00c7)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          John McClure
        </Title>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Experience />} />
        </Routes>
      </Router>
    </AppContainer>
  );
}

export default App;
