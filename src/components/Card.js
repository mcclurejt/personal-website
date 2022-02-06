import styled from "styled-components";
import { Body, Header } from "./Text";

export const CardContainer = styled.div`
  padding: 25vh 0;
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Card = styled.div.attrs((props) => ({
  style: {
    transform: `translateX(${props.reverse ? "-" : ""}${
      100.0 - props.animationPercent * 100.0
    }vw) rotate(${90.0 - 90.0 * props.animationPercent}deg)`,
    opacity: props.animationPercent,
  },
}))`
  background-color: ${(props) => props.theme.colors.background};
  padding: 10px;
  border-radius: 10px;
  display: flex;
  margin: 0 auto;
  border: 5px solid ${(props) => props.theme.colors.foreground};
`;

export const CardImage = styled.img`
  border-radius: 10px;
  margin: auto 0;
`;

export const CardTextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const CardTextSmall = styled(Body)`
  font-size: ${(props) => props.theme.body.size.large};
  text-align: center;
  color: ${(props) => props.theme.colors.foreground};
`;

export const CardTextLarge = styled(Header)`
  color: ${(props) => props.theme.colors.foreground};
  text-align: center;
  padding: 0 1em;
`;
