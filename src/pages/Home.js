import React, { useRef, useState, useEffect } from "react";
import styled, { keyframes, useTheme } from "styled-components";
import SVG from "react-inlinesvg";
import { Header, Body } from "../components/Text";
import { Button } from "../components/Button";
import {
  CardContainer,
  Card,
  CardImage,
  CardTextContainer,
  CardTextSmall,
  CardTextLarge,
} from "../components/Card";
import ArrowDownSVG from "../svg/arrow-down.svg";
import { NavLink } from "../components/Bar";

const Home = ({ setCenterContent }) => {
  const theme = useTheme();
  const [ap, _setAp] = useState(0);
  const apRef = useRef(null);
  const setAp = (percentages) => {
    apRef.current = percentages;
    _setAp(percentages);
  };
  const cardRef1 = useRef(null),
    cardRef2 = useRef(null),
    cardRef3 = useRef(null),
    cardRef4 = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", scrollListener, true);
    return () => window.removeEventListener("scroll", scrollListener, true);
  }, []);

  useEffect(() => {
    setCenterContent(
      <CenterContent small center>
        John McClure
      </CenterContent>
    );
    return () => setCenterContent(null);
  }, []);

  const scrollListener = () => {
    handleScrollDown();
  };

  const handleScrollDown = () => {
    const refs = [cardRef1, cardRef2, cardRef3, cardRef4];
    for (let i = 0; i < refs.length; i++) {
      const rect = refs[i].current.getBoundingClientRect();
      let animationPercentage = 0;
      if (rect.top > 0.5 * rect.height) {
        animationPercentage = 0;
      } else if (
        rect.top <= 0.5 * rect.height &&
        rect.top >= 0.25 * rect.height
      ) {
        animationPercentage =
          (0.5 * rect.height - rect.top) / (0.25 * rect.height);
      } else if (
        rect.top < 0.25 * rect.height &&
        rect.top > -0.25 * rect.height
      ) {
        animationPercentage = 1;
      } else if (
        rect.top <= -0.25 * rect.height &&
        rect.top >= -0.5 * rect.height
      ) {
        animationPercentage =
          (0.5 * rect.height + rect.top) / (0.25 * rect.height);
      } else {
        animationPercentage = 0;
      }
      const newAp = { ...apRef.current, [i.toString()]: animationPercentage };
      setAp(newAp);
    }
  };

  return (
    <HomeContainer>
      {/** JOHN MCCLURE */}
      <TitleContainer>
        <Title center large>
          Welcome
        </Title>
        <Subtitle large>Scroll to learn a little about me...</Subtitle>
        <ArrowDown src={ArrowDownSVG} color="#f0f0f0" />
      </TitleContainer>
      {/** First Card */}
      <CardContainer ref={cardRef1}>
        <Card animationPercent={ap.hasOwnProperty("0") ? ap["0"] : 0}>
          <CardImage src="https://i.ibb.co/7CPRzYc/snowboarding.jpg" />
          <CardTextContainer>
            <CardTextLarge>
              I'm a <Green>Snowboarder...</Green>
            </CardTextLarge>
            <CardTextSmall>I like other boards too!</CardTextSmall>
          </CardTextContainer>
        </Card>
      </CardContainer>
      {/** Second Card */}
      <CardContainer ref={cardRef2}>
        <Card reverse animationPercent={ap.hasOwnProperty("1") ? ap["1"] : 0}>
          <CardTextContainer>
            <CardTextLarge>
              I'm a <Orange>Cat Dad...</Orange>
            </CardTextLarge>
            <CardTextSmall>Always seeking purrfection</CardTextSmall>
          </CardTextContainer>
          <CardImage src="https://i.ibb.co/BfJ4rCq/Loomboy.png" />
        </Card>
      </CardContainer>
      {/** Third Card */}
      <CardContainer ref={cardRef3}>
        <Card animationPercent={ap.hasOwnProperty("2") ? ap["2"] : 0}>
          <CardImage src="https://i.ibb.co/wMvs6Qt/hackerman.jpg" />
          <CardTextContainer>
            <CardTextLarge>
              And a <Icy>Developer!</Icy>
            </CardTextLarge>
            <CardTextSmall>Let's work together!</CardTextSmall>
          </CardTextContainer>
        </Card>
      </CardContainer>
      {/** Fourth Card */}
      <CardContainer reverse ref={cardRef4} style={{ marginBottom: "5em" }}>
        <Card animationPercent={ap.hasOwnProperty("3") ? ap["3"] : 0}>
          <CardTextContainer>
            <CardTextLarge>Check out some of my stuff!</CardTextLarge>
            <BottomLink foreground={theme.colors.first} as={NavLink} to="/mint">
              Mint Page
            </BottomLink>
          </CardTextContainer>
        </Card>
      </CardContainer>
    </HomeContainer>
  );
};

const CenterContent = styled(Header)`
  margin: 0 auto;
  font-size: ${(props) => props.theme.body.size.small};
  color: ${(props) => props.theme.colors.first};
  -webkit-text-stroke: 1px ${(props) => props.theme.colors.foreground};
`;

const HomeContainer = styled.div`
  margin: 0;
  padding: 0;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleAnimation = keyframes`
from {
  transform: translateY(-1.5em) scaleX(1);
  opacity: 0;
}
25%{
  transform: translateY(-1em) scaleX(0.75);
  opacity: 0.7;
}
50%{
  transform: translateY(1em) scaleX(0.25);
  opacity: 0.6;
}
75%{
  transform: translateY(0.5em) scaleX(0.5);
  opacity: 0.6;
}
to{
  transform: translateY(0em) scaleX(1);
  opacity: 1;
}
`;

const Title = styled(Header)`
  transform: translateY(-2em);
  opacity: 0;
  text-align: center;
  margin: 0.5em auto;
  overflow: hidden;
  white-space: nowrap;
  color: ${(props) => props.theme.colors.foreground};
  font-weight: bold;
  font-size: 7em;
  -webkit-text-stroke: 1px ${(props) => props.theme.colors.foreground};
  animation: ${TitleAnimation} 1s steps(24) forwards;
`;

const SubtitleAnimation = keyframes`
to {
  width: 36ch;
}
`;

const Subtitle = styled(Body)`
  text-align: center;
  width: 0;
  overflow: hidden;
  white-space: nowrap;
  margin: 0 auto;
  animation: ${SubtitleAnimation} 2s steps(36) forwards;
  animation-delay: 1s;
`;

const ArrowAnimation = keyframes`
from {
  opacity: 0;
}
25%{
  opacity: 0.5;
}
50%{
  opacity: 1;
}
75%{
 opacity: 0.5
}
to {
  opacity: 0;
}
`;

const ArrowDown = styled(SVG)`
  margin: 5em auto;
  height: 5em;
  align-self: center;
  opacity: 0;
  animation: ${ArrowAnimation} 2s steps(20) forwards infinite;
  animation-delay: 3s;
  & path {
    fill: ${(props) => props.theme.colors.foreground};
  }
`;

const Green = styled.span`
  color: #00a743;
  -webkit-text-stroke: 2px ${(props) => props.theme.colors.foreground};
`;

const Orange = styled.span`
  color: #e77042;
  -webkit-text-stroke: 2px ${(props) => props.theme.colors.foreground};
`;

const Icy = styled.span`
  color: #00bdb2;
  -webkit-text-stroke: 2px ${(props) => props.theme.colors.foreground};
`;

const BottomLink = styled(Button).attrs((props) => ({
  foreground: props.theme.colors.second,
}))`
  margin: 0 auto;
  font-size: ${(props) => props.theme.body.size.large};
  padding: 0 1em;
`;

export default Home;
