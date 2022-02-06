import styled from "styled-components";
import { Header, Body } from "../components/Text";

const GalleryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow-x: auto;
  background-color: ${(props) => props.theme.colors.background};
`;

const GalleryItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0 1em;
`;

const GalleryItemName = styled(Header)`
  margin: 0 auto;
  color: ${(props) => props.color};
  -webkit-text-stroke: 2px ${(props) => props.theme.colors.foreground};
`;

const GalleryItemImage = styled.img`
  max-height: 30vh;
  border-radius: 1em;
  border: 4px solid ${(props) => props.theme.colors.foreground};
`;

const GalleryItemDescriptionContainer = styled.div`
  width: 100%;
`;
const GalleryItemDescription = styled(Body)`
  font-size: ${(props) => props.theme.body.size.medium};
  padding: 0 0.25em;
`;

export const Gallery = (items) => (
  <GalleryContainer>
    {items.map((item) => (
      <GalleryItem key={item.name}>
        <GalleryItemName medium color={item.properties["background"]}>
          {item.name}
        </GalleryItemName>
        <GalleryItemImage src={item.src} />
        <GalleryItemDescriptionContainer>
          {Object.keys(item.properties).map((property) => (
            <GalleryItemDescription key={property}>
              <b>{property}</b>: {item.properties[property]}
              <br />
            </GalleryItemDescription>
          ))}
        </GalleryItemDescriptionContainer>
      </GalleryItem>
    ))}
  </GalleryContainer>
);
