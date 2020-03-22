import React from "react";
import { withFormik, Form, Field } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import AirLogo from '../assets/air-loading-v1.png';

import Loader from "../../loader/components/Loader";
import { forgotPasswordStart } from "../actions/authActionCreators";

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

const StyledLogo = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 20px;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  max-width: 256px;
  width: 100%;
`;

const Text = styled.p`
  text-align: center;
  color: #808080;
  margin: ${props=>props.margin || '0'};
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const FormRadioItem = styled.div`
  display: flex;
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

const InputRadio = styled.input`
  margin: 0;
`;

const LabelRadio = styled.label`
  margin: 0 10px;
`;

const Button = styled.button`
  background-color: ${props => props.theme.primary};
  color: #fff;
  border: 0;
  cursor: pointer;
  height: 36px;
  border-radius: 2px;
  font-size: 0.8rem;
  padding: 0;
  margin-bottom: 20px;
  font-family: "Sofia Pro", sans-serif;
  :disabled {
    background-color: rgba(0, 0, 0, 0.2);
    cursor: default;
  }
`;

const ErrorMessage = styled.span`
  font-size: 0.8rem;
  color: #b00e23;
`;

const FormikForm = props => {
  const {
    errors,
    touched,
    isSubmitting,
    submitCount,
    isValid,
    forgot_password_success,
    values,
    handleChange,
    handleBlur
  } = props;

  function handleDisabled(isSubmitting, errors) {
    if (isSubmitting) {
      return true;
    }
    // checks if errors object is empty
    return Object.entries(errors).length !== 0 && errors.constructor === Object;
  }

  return (
    <Wrapper>
      <StyledForm>
        {forgot_password_success ? 
          <Text>Please check your email to set new password</Text>
          :
          <>
            <StyledLogo src={AirLogo} />
            <Text margin="0 0 10px 0">Enter a valid email address to continue</Text>
            <FormItem>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                data-cy="email"
              />
              {touched.email && errors.email && (
                <ErrorMessage>{errors.email}</ErrorMessage>
              )}
            </FormItem>
            <Button
              disabled={handleDisabled(isSubmitting, errors)}
              data-cy="submit"
            >
              {isSubmitting ? <Loader /> : "Send email"}
            </Button>
            <ErrorMessage>{errors.general}</ErrorMessage>
          </>
          }
        </StyledForm>
    </Wrapper>
  );
};

const ForgotPassword = withFormik({
  mapPropsToValues: props => ({
    email: props.email || ""
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid")
  }),
  handleSubmit(payload, bag) {
    bag.props.forgotPasswordStart(payload, {
      setSubmitting: bag.setSubmitting,
      setFieldError: bag.setFieldError,
      history: bag.props.history
    });
  }
})(FormikForm);

export default withRouter(
  connect(
    state => ({
      forgot_password_success: state.auth.forgot_password_success,
    }),
    { forgotPasswordStart }
  )(ForgotPassword)
);
