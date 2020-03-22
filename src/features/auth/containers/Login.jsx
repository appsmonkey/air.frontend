import React, { Component } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import AirLogo from '../assets/air-loading-v1.png';
import {ReactComponent as googleIcon} from '../assets/google-icon.svg';
import {ReactComponent as facebookIcon} from '../assets/facebook-icon.svg';

import Loader from "../../loader/components/Loader";
import SplashScreenLoader from '../../loader/components/SpashScreen';
import { login, socialLogin } from "../actions/authActionCreators";

const Wrapper = styled.div`
  min-height: 100vh;
  padding: 128px 0;
  display: flex;
  justify-content: center;
  font-family: "Sofia Pro", sans-serif;
  @media (min-width: 576px) {
    align-items: center;
  }
`;

const SocialButtons = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
`

const InlineWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`;

const StyledLogo = styled.img`
  width: 50%;
  height: auto;
  margin-bottom: 20px;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 10px;
  max-width: 460px;
  width: 100%;
`;

const FormItem = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-right: 10px;
`;

const Input = styled(Field)`
  color: #3a3133;
  height: 36px;
  font-size: 0.8rem;
  padding: 0 4px;
  outline: 0;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 2px;
  font-family: "Sofia Pro", sans-serif;
`;

const Button = styled.button`
  background-color: ${props => props.theme.primary};
  color: #fff;
  border: 0;
  cursor: pointer;
  height: 36px;
  border-radius: 2px;
  font-size: 0.8rem;
  padding: 2px 10px;
  font-family: "Sofia Pro", sans-serif;
  :disabled {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const GoogleButton = styled.button`
  flex: 1;
  background-color: #ea645e;
  color: #fff;
  border: 0;
  cursor: pointer;
  height: 36px;
  border-radius: 8px;
  font-size: 0.8rem;
  padding: 2px 10px;
  display: flex;
  align-items: center;
  :disabled {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const GoogleIcon = styled(googleIcon)`
  height: 1.2rem;
  width: auto;
  margin-right: 5px;
  fill: #fff;
`

const SocialTitle = styled.p`
  text-align: center;
  color: #808080;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const FacebookButton = styled.button`
  flex: 1;
  margin-right: 10px;
  height: 34px;
  display: flex;
  align-items: center;
  color: #fff;
  cursor: pointer;
  background-color: #4568b2;
  border: calc(.06887vw + .67769px) solid #4568b2;
  border-radius: 8px;
`;

const FacebookIcon = styled(facebookIcon)`
  height: 1.2rem;
  width: auto;
  margin-right: 5px;
  fill: #fff;
`

const ErrorMessage = styled.span`
  font-size: 0.8rem;
  color: #b00e23;
`;

const StyledLink = styled(NavLink)`
  cursor: pointer;
  margin-bottom: 5px;
  margin-top: 5px;
  color: #808080;
  &:visited{
    color: #808080;
  }
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const FB_APP_ID = process.env.REACT_APP_FB_APP_ID;

class FormikForm extends Component {
  componentDidMount(){
    const { history } = this.props;
    if(this.isAdmin()){
      history.push('/admin');
    } else if(this.isLoggedIn()){
      history.push('/dashboard')
    }
  }

  componentWillUnmount = () => {
    const { setSubmitting } = this.props;

    setSubmitting(false);
  };

  responseFacebook = (response) => {
    const { socialLogin, history, setSubmitting, setStatus } = this.props;
    if (response && response.email) {
      socialLogin({
        email: response.email,
        token: response.accessToken,
        id: response.userID,
        type: 'FB',
      }, { history, setSubmitting, setStatus });
    }
    else {
      console.log("Facebook login failed: ", response)
    }
  }

  googleSuccessCallback = (response) => {
    const { socialLogin, history, setSubmitting, setStatus } = this.props;

    socialLogin({
      email: response.profileObj.email,
      token: response.tokenId,
      id: response.profileObj.googleId,
      type: 'G',
    }, { history, setSubmitting, setStatus });
  }

  googleFailureCallback = (response) => {
    console.log("Google login failed: ", response);
  }

  isLoggedIn = () => {
    if (localStorage.getItem("id_token") === null) {
      return false;
    }
    return true;
  };

  isAdmin = () => {
    return this.isLoggedIn() && localStorage.getItem("isAdmin") == "true";
  };

  render() {
    const { errors, touched, isSubmitting, status } = this.props;
    if(isSubmitting) return <SplashScreenLoader><img style={{width: 'auto', height: '300px', marginBottom: '10px'}} src={AirLogo} /></SplashScreenLoader>;

    return (
      <Wrapper>
        <StyledForm>
          <StyledLogo src={AirLogo} />
          <InlineWrapper>
            <FormItem>
              <Input
                type="text"
                name="email"
                placeholder="Email"
                data-cy="email"
              />
              {touched.email && errors.email && (
                <ErrorMessage>{errors.email}</ErrorMessage>
              )}
            </FormItem>
            <FormItem>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                data-cy="password"
              />
              {touched.password && errors.password && (
                <ErrorMessage>{errors.password}</ErrorMessage>
              )}
            </FormItem>
            <Button disabled={isSubmitting} data-cy="submit">
              {isSubmitting ? <Loader /> : "GO"}
            </Button>
          </InlineWrapper>
          <SocialTitle><StyledLink to="/forgot-password">Forgot password?</StyledLink></SocialTitle>
          <SocialButtons>
            <FacebookLogin
              style={{ height: '34px' }}
              appId={FB_APP_ID}
              fields="name,email,picture"
              // onClick={componentClicked}
              callback={this.responseFacebook}
              render={renderProps => (
                <FacebookButton type="button" onClick={renderProps.onClick}>
                  <FacebookIcon />
                  Facebook
                </FacebookButton>
              )}
            />
            
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              render={renderProps => (
              <GoogleButton type="button" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                <GoogleIcon />
                  Google
              </GoogleButton>
              )}
              buttonText="Login"
              onSuccess={this.googleSuccessCallback}
              onFailure={this.googleFailureCallback}
              cookiePolicy={'single_host_origin'}
            />
          </SocialButtons>
          <SocialTitle><StyledLink to="/signup">Signup with email</StyledLink></SocialTitle>
          {!!status && <ErrorMessage>{status}</ErrorMessage>}
        </StyledForm>
      </Wrapper>
    );
  }
}

const LoginForm = withFormik({
  mapPropsToValues: props => ({
    email: props.email || "",
    password: props.password || ""
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
    password: Yup.string().required("Password is required")
  }),
  handleSubmit(payload, bag) {
    bag.props.login(payload, {
      setSubmitting: bag.setSubmitting,
      setStatus: bag.setStatus,
      history: bag.props.history
    });
  }
})(FormikForm);

export default withRouter(
  connect(
    null,
    { login, socialLogin }
  )(LoginForm)
);
