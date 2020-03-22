import React from "react";
import styled from "styled-components";

import { Title, Description } from "./Homepage";

const Wrapper = styled.div`
  padding: 32px;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Center = styled.div`
  text-align: center;
`;

const Apps = () => {
  return (
    <Wrapper>
      <Center>
        <Title>Citizen Apps</Title>
        <Description>Ready-to-go code templates for citizen apps.</Description>
      </Center>
    </Wrapper>
  );
};

export default Apps;
