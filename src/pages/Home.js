import React, { useRef, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import SVG from "react-inlinesvg";
import { Header } from "../components/Text";
import {
  CardContainer,
  Card,
  CardImage,
  CardTextContainer,
  CardTextSmall,
  CardTextLarge,
} from "../components/Card";
import ArrowDownSVG from "../svg/arrow-down.svg";

const Home = () => {
  const [ap, _setAp] = useState(0);
  const apRef = useRef(null);
  const setAp = (percentages) => {
    apRef.current = percentages;
    _setAp(percentages);
  };
  const titleRef = useRef(null),
    cardRef1 = useRef(null),
    cardRef2 = useRef(null),
    cardRef3 = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", scrollListener, true);
    titleRef.current.classList.add("active");
    return () => window.removeEventListener("scroll", scrollListener, true);
  }, []);

  const scrollListener = () => {
    handleScrollDown();
  };

  const handleScrollDown = () => {
    const refs = [cardRef1, cardRef2, cardRef3];
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
        <Title large ref={titleRef}>
          John McClure
        </Title>
        <Header center small>
          Scroll Down!
        </Header>
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
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  margin: 0;
  padding: 0;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TypeInAnimation = keyframes`
to {
  width: 12ch;
}
`;

const Title = styled(Header)`
  width: 0ch;
  text-align: center;
  margin: 0 auto;
  overflow: hidden;
  white-space: nowrap;
  color: ${(props) => props.theme.colors.first};
  font-weight: bold;
  -webkit-text-stroke: 1px ${(props) => props.theme.colors.foreground};
  &.active {
    animation: ${TypeInAnimation} 2s steps(12) forwards;
  }
`;

const ArrowDown = styled(SVG)`
  margin: 5vw auto;
  height: 5vw;
  align-self: center;
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

export default Home;
