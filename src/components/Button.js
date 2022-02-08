import styled from "styled-components";
import { keyframes } from "styled-components";

export const Button = styled.button`
  border: 0;
  width: auto;
  padding: 0.1em 1em;
  border-radius: 0.25em;
  cursor: pointer;
  font-family: ${(props) => props.theme.body.family};
  font-size: ${(props) =>
    props.small
      ? props.theme.body.size.small
      : props.medium
      ? props.theme.body.size.medium
      : props.large
      ? props.theme.body.size.large
      : props.theme.body.size.medium};
  font-weight: ${(props) => (props.bold ? "bold" : "regular")};
  color: ${(props) =>
    props.invert
      ? props.theme.colors.background
      : props.foreground || props.theme.colors.foreground};
  background-color: ${(props) =>
    props.invert
      ? props.foreground || props.theme.colors.foreground
      : props.theme.colors.background};
  border: 3px solid
    ${(props) => props.foreground || props.theme.colors.foreground};
  transition-property: background-color, color, border;
  transition-duration: 0.25s;
  transition-timing-function: ease-in-out;
  &:hover {
    color: ${(props) =>
      props.invert
        ? props.foreground || props.theme.colors.foreground
        : props.theme.colors.background};
    background-color: ${(props) =>
      props.invert
        ? props.theme.colors.background
        : props.foreground || props.theme.colors.foreground};
  }
`;

export const GradientAnimation = keyframes`
0% {
  background-position: 0% 50%;
}
50% {
  background-position: 100% 50%;
}
100% {
  background-position: 0% 50%;
}
`;

export const GradientButton = styled(Button)`
  background: ${(props) =>
    `-webkit-linear-gradient(left,${props.theme.colors.first},${props.theme.colors.second})`};
  color: ${(props) => props.theme.colors.background};
  background-size: 200% 200%;
  animation-name: ${GradientAnimation};
  animation-duration: 4s;
  animation-iteration-count: infinite;
`;
