import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import OutsideClickHandler from "react-outside-click-handler";

const MODAL_ROOT = document.getElementById("modal-root");

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 24px;
  min-width: 512px;
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: normal;
  color: #000;
  margin-bottom: 16px;
`;

const Body = styled.div`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.8);
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
`;

const SubmitButton = styled.button`
  background-color: ${props => props.theme.primary};
  color: #fff;
  border: 0;
  cursor: pointer;
  height: 36px;
  border-radius: 2px;
  font-size: 0.8rem;
  padding: 0 12px;
  :disabled {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const CancelBtn = styled.button`
  border: 1px solid ${props => props.theme.primary};
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  border-radius: 2px;
  font-size: 0.8rem;
  padding: 0 12px;
  margin-right: 10px;
  background-color: #fff;
`;

const Modal = props => {
  return ReactDOM.createPortal(
    <StyledModal>
      <OutsideClickHandler onOutsideClick={props.dismiss}>
        <Content>
          <Title>{props.title}</Title>
          <Body>{props.text}</Body>
          <Buttons>
            <CancelBtn onClick={props.dismiss}>Cancel</CancelBtn>
            <SubmitButton onClick={props.action}>
              {props.confirmText}
            </SubmitButton>
          </Buttons>
        </Content>
      </OutsideClickHandler>
    </StyledModal>,
    MODAL_ROOT
  );
};

export default Modal;
