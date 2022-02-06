import styled from "styled-components";

export const Body = styled.span`
  font-family: ${(props) => props.theme.body.family};
  font-size: ${(props) =>
    props.small
      ? props.theme.body.size.small
      : props.medium
      ? props.theme.body.size.medium
      : props.large
      ? props.theme.body.size.large
      : props.theme.body.size.medium};
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  color: ${(props) => props.theme.colors.foreground};
`;

export const Header = styled.h1`
  font-family: ${(props) => props.theme.header.family};
  font-size: ${(props) =>
    props.small
      ? props.theme.header.size.small
      : props.medium
      ? props.theme.header.size.medium
      : props.large
      ? props.theme.header.size.large
      : props.theme.header.size.medium};
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  text-align: ${(props) => (props.center ? "center" : "left")};
  color: ${(props) => props.theme.colors.foreground};
`;
