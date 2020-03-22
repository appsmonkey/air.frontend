import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { ReactComponent as XIcon } from "../assets/x.svg";
import { clearNotification } from "../actions/notificationActionCreators";

const StyledNotification = styled.div`
  top: 52px;
  left: 0;
  right: 0;
  position: fixed;
  background-color: #48dede;
  z-index: 99;
`;

const Container = styled.div`
  margin: 0 auto;
  position: relative;
  padding: 0 32px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledXIcon = styled(XIcon)`
  color: #333;
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
`;

class Notification extends React.Component {
  render() {
    const { show, message, clearNotification } = this.props;
    
    return (
      <>
        {show ? (
          <StyledNotification>
            <Container>
              {message} <StyledXIcon onClick={clearNotification} />
            </Container>
          </StyledNotification>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    show: state.notification.show,
    message: state.notification.message
  };
};

export default connect(
  mapStateToProps,
  { clearNotification }
)(Notification);
