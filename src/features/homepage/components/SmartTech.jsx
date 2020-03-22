import React from "react";
import styled from "styled-components";

import spaceBg from "../assets/space.jpg";

import { Subtitle, Title, Description } from "./Homepage";

const BgWrapper = styled.section`
  background-image: url(${spaceBg});
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

const SmartTech = () => {
  return (
    <BgWrapper>
      <Wrapper>
        <TextWrapper>
          <Subtitle>The Way We Do</Subtitle>
          <Title>Smart Cities</Title>
          <Description>
            Our open library of open source software, APIs, and apps allows
            local citizens to quickly develop smart cities from scratch.
          </Description>
          <Description>
            Frameworks and templates are customizable allowing people to easily
            design, build, customize, deploy, and maintain smart city apps and
            hardware. This fosters community support and education of smart
            cities and helps create local businesses.
          </Description>
        </TextWrapper>
      </Wrapper>
    </BgWrapper>
  );
};

export default SmartTech;
