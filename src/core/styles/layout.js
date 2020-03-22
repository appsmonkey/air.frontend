import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
  ${props => props.direction ? `flex-direction:${props.direction};` : ''}
  ${props => props.justify ? `justify-content:${props.justify};` : ''}
  ${props => props.align ? `align-items:${props.align};` : ''}
  ${props => props.grow ? `flex-grow:${props.grow};` : ''}
  ${props => props.center ? `
    justify-content: center;
    align-items: center;
  ` : ''}
  ${props => props.marginBottom ? `margin-bottom:${props.marginBottom}px;` : ''}
`;