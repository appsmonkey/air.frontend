import React from "react";
import styled from "styled-components";

import laptopBg from "../assets/laptop.jpg";

import { Title, Description } from "./Homepage";

const BgWrapper = styled.section`
  background-image: url(${laptopBg});
  background-size: cover;
  background-position: center;
`;

const Wrapper = styled.div`
  padding: 32px;
  background-color: rgba(0, 0, 0, 0.6);
`;

const TextWrapper = styled.div`
  @media (min-width: 576px) {
    max-width: 50%;
  }
`;

const ControlRoom = () => {
  return (
    <BgWrapper>
      <Wrapper>
        <TextWrapper>
          <Title>Control Room</Title>
          <Description>
            Pre-built code templates for displaying open city data.
          </Description>
        </TextWrapper>
      </Wrapper>
    </BgWrapper>
  );
};

export default ControlRoom;
