import styled from "styled-components";
import SVG from "react-inlinesvg";
import { Body } from "./Text";
import { NavLink as Link } from "react-router-dom";

const BarContainer = styled.div`
  width: 100%;
  display: flex;
  ${(props) => (props.isBottom ? "margin-top: auto;" : null)};
  align-items: center;
  margin-bottom: 1em;
`;

const Title = styled(Body)`
  margin: 0 0;
  font-size: ${(props) => props.theme.body.size.medium};
`;

export const BarItems = styled.div`
  height: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: ${(props) => (props.left ? "flex-start" : "flex-end")};
  padding: 0 0.5em;
`;

export const Bar = ({ center, left, right }) => (
  <BarContainer>
    {left}
    <Title>{center}</Title>
    {right}
  </BarContainer>
);

export const NavLink = styled(Link)`
  min-width: 2em;
  padding: 0 0.25em;
  margin: 0.25em;
  font-family: "Dongle", cursive;
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  border-radius: 0.25em;
  border: 2px solid ${(props) => props.theme.colors.foreground};
  color: ${(props) => props.theme.colors.foreground};
  &.active {
    border: 2px solid ${(props) => props.theme.colors.second};
    color: ${(props) => props.theme.colors.second};
    cursor: default;
  }
  &:hover:not(.active) {
    color: ${(props) => props.theme.colors.background};
    background-color: ${(props) => props.theme.colors.foreground};
  }
`;

export const BarSVG = styled(SVG)`
  padding: 0.25em 0.75em;
  margin: auto 0;
  height: 1.5em;
  width: 1.5em;
  & path {
    fill: ${(props) => props.theme.colors.foreground};
  }
`;
