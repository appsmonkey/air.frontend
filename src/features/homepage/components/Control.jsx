import React from "react";
import styled from "styled-components";

import monitorBg from "../assets/monitor.jpg";

import { Subtitle, Title, Description } from "./Homepage";

const BgWrapper = styled.section`
  background-image: url(${monitorBg});
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

const Control = () => {
  return (
    <BgWrapper>
      <Wrapper>
        <TextWrapper>
          <Subtitle>Open City</Subtitle>
          <Title>Code</Title>
          <Description>
            The open CityOS platform brings cities to life, visualizing real
            time data on large displays and mobile apps.
          </Description>
        </TextWrapper>
      </Wrapper>
    </BgWrapper>
  );
};

export default Control;
