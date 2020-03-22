import React from "react";
import styled from "styled-components";

import heroBg from "../assets/hero-bg.jpg";
import Platform from "./Platform";
import Control from "./Control";
import SmartTech from "./SmartTech";
import ControlRoom from "./ControlRoom";
import Apps from "./Apps";
import Events from "./Events";
import Join from "./Join";

const BgWrapper = styled.section`
  background-image: url(${heroBg});
  background-size: cover;
  background-position: center;
`;

const HeroWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 128px 0;
  background-color: rgba(0, 0, 0, 0.2);
  text-align: center;
  @media (min-width: 576px) {
    padding: 64px;
  }
`;

export const Subtitle = styled.h2`
  color: ${props => (props.color ? props.color : props.theme.primary)};
  font-weight: normal;
  text-transform: uppercase;
  font-size: 1rem;
  @media (min-width: 576px) {
    font-size: 2rem;
  }
  @media (min-width: 770px) {
    font-size: 3rem;
  }
  @media (min-width: 992px) {
    font-size: 4rem;
  }
`;

export const Title = styled.h1`
  color: ${props => (props.color ? props.color : props.theme.primary)};
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-size: 1rem;
  @media (min-width: 576px) {
    font-size: 2rem;
  }
  @media (min-width: 770px) {
    font-size: 3rem;
  }
  @media (min-width: 992px) {
    font-size: 4rem;
  }
`;

export const Description = styled.p`
  color: ${props => (props.color ? props.color : "#fff")};
  margin-bottom: 1rem;
  font-size: 1rem;
  @media (min-width: 576px) {
    font-size: 2rem;
  }
`;

const Homepage = () => {
  return (
    <>
      <BgWrapper>
        <HeroWrapper>
          <Subtitle>Helping the world build</Subtitle>
          <Title>Open Cities</Title>
          <Description>Open source city software available to all</Description>
        </HeroWrapper>
      </BgWrapper>
      <Platform />
      <Control />
      <SmartTech />
      <ControlRoom />
      <Apps />
      <Events />
      <Join />
    </>
  );
};

export default Homepage;
