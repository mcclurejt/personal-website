import React from "react";
import styled from "styled-components";

const Container = styled.div`
  min-width: 20vw;
  max-width: 80vw;
  min-height: 10vw;
  max-height: 50vw;
  margin: 1em auto;
  padding: 1em;
  border-radius: 10px;
  display: flex;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 15vw;
`;

const Image = styled.img`
  margin: 10px;
  border-radius: 10px;
`;

const TextContainer = styled.div`
  padding: 0 2em;
`;

interface NameProps {
  readonly color1?: string;
  readonly color2?: string;
}

const Name = styled.h3<NameProps>`
  font-family: "Fredoka One", cursive;
  font-size: 2.5em;
  margin: 0 0 auto 0;
  text-align: left;
  & + * {
    margin-top: 0;
  }
  width: fit-content;
`;

type CardProps = {
  srcs: string[];
  name: string;
  children: JSX.Element[] | JSX.Element;
  color1?: string;
  color2?: string;
};

function Card({ srcs, name, children, color1, color2 }: CardProps) {
  return (
    <Container>
      <ImageContainer>
        {srcs.map((src: string) => (
          <Image src={src} />
        ))}
      </ImageContainer>
      <TextContainer>
        <Name
          style={{
            background: `linear-gradient(45deg, ${color1}, ${color2})`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {name}
        </Name>
        {children}
      </TextContainer>
    </Container>
  );
}
export default Card;
