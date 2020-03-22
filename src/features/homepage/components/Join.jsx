import React from "react";
import styled from "styled-components";

import spaceBg from "../assets/space.jpg";

import { Title } from "./Homepage";

const BgWrapper = styled.section`
  background-image: url(${spaceBg});
  background-size: cover;
  background-position: center;
`;

const Wrapper = styled.div`
  padding: 32px;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Center = styled.div`
  text-align: center;
`;

const Join = () => {
  return (
    <BgWrapper>
      <Wrapper>
        <Center>
          <Title>The revolution has begun</Title>
        </Center>
      </Wrapper>
    </BgWrapper>
  );
};

export default Join;
