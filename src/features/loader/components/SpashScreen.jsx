import React from "react";
import styled, { keyframes } from "styled-components";
import cloudsBg from "../../dashboard/assets/launch-bg.png";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoaderWrapper = styled.div`
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${cloudsBg});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLoader = styled.div`
  border: 4px solid #04dfe9;
  border-radius: 50%;
  border-top: 4px solid transparent;
  width: 30px;
  height: 30px;
  animation: ${rotate360} 2s linear infinite;
  margin: 0 6px;
`;

const Message = styled.span`
  font-size: 0.8rem;
  color: #fff;
`;

const SpashScreen = props => {
  return (
    <LoaderWrapper>
      {props.children}
      <StyledLoader />
      {props.message && <Message>{props.message}</Message>}
    </LoaderWrapper>
  );
};

export default SpashScreen;
