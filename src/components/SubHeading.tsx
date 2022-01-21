import React from "react";
import styled from "styled-components";

const SubHeading = styled.h5`
  font-family: "Dongle", cursive;
  font-size: 2.5em;
  font-style: bold;
  color: #484848;
  text-align: left;
  & + p {
    margin-top: 0;
  }
  margin: 0 auto;
`;

export default SubHeading;
