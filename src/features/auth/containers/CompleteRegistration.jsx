import React from "react";
import { withFormik, Form, Field } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import Loader from "../../loader/components/Loader";
import { completeSignup } from "../actions/authActionCreators";
import { Layout } from "../../../core/styles/layout";
import moment from "moment";

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

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  max-width: 350px;
  width: 100%;
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const InlineFormItem = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 20px;
  &:not(:last-child){
    margin-right: 15px;
  }
`;

const FormRadioItem = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Input = styled(Field)`
  font-family: "Sofia Pro", sans-serif;
  color: #3a3133;
  height: 36px;
  width: 100%;
  font-size: 0.8rem;
  padding: 0 4px;
  outline: 0;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 2px;
`;

const InputRadio = styled.input`
  margin: 0;
`;

const LabelRadio = styled.label`
  margin: 0 10px;
  color: #3a3133;
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
  text-align: ${props => props.textAlign || 'left'};
`;

const StyledDatePicker = styled(DatePicker)`
  color: #3a3133;
  height: 36px;
  width: 100%;
  font-size: 0.8rem;
  padding: 0 4px;
  outline: 0;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 2px;
  font-family: "Sofia Pro", sans-serif;
`;

const InlineBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px 0;
`;

const TextLink = styled.p`
  text-align: center;
  color: #808080;
  margin-right: 10px;
`;

const ExternalLink = styled.a`
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

const DatePickerField = ({ name, value, onChange, handleBlur, setFieldTouched }) => {
  return (
    <StyledDatePicker
      selected={(value && new Date(value)) || null}
      onChange={val => {
        onChange(name, val);
      }}
      onBlur={()=>{setFieldTouched("birthday", true)}}
    />
  );
};

const FormikForm = props => {
  const {
    errors,
    touched,
    isSubmitting,
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched
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
        <Layout align="center">
          <InlineFormItem>
            <Input
              type="text"
              name="first_name"
              placeholder="First name"
              data-cy="first_name"
            />
            {touched.first_name && errors.first_name && (
              <ErrorMessage>{errors.first_name}</ErrorMessage>
            )}
          </InlineFormItem>
          <InlineFormItem>
            <Input
              type="text"
              name="last_name"
              placeholder="Last name"
              data-cy="last_name"
            />
            {touched.last_name && errors.last_name && (
              <ErrorMessage>{errors.last_name}</ErrorMessage>
            )}
          </InlineFormItem>
        </Layout>
        <FormItem>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            data-cy="email"
            disabled
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
        <FormItem>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            data-cy="confirmPassword"
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
          )}
        </FormItem>
        <FormItem>
          <DatePickerField
            name="birthday"
            value={values.birthday}
            onChange={setFieldValue}
            handleBlur={handleBlur}
            setFieldTouched={setFieldTouched}
          />
          {touched.birthday && errors.birthday && (
            <ErrorMessage>{errors.birthday}</ErrorMessage>
          )}
        </FormItem>
        <FormItem>
          <FormRadioItem>
            <Layout align="center">
              <InputRadio
                id="female"
                name="gender"
                type="radio"
                value="female"
                checked={values.gender === "female"}
                onChange={handleChange}
                onBlur={handleBlur}
                data-cy="gender"
              />
              <LabelRadio htmlFor="female">Female</LabelRadio>
            </Layout>
            <Layout align="center">
              <InputRadio
                id="male"
                name="gender"
                type="radio"
                value="male"
                checked={values.gender === "male"}
                onChange={handleChange}
                onBlur={handleBlur}
                data-cy="gender"
              />
              <LabelRadio htmlFor="male">Male</LabelRadio>
            </Layout>
          </FormRadioItem>
          {touched.gender && errors.gender && (
            <ErrorMessage textAlign="center">{errors.gender}</ErrorMessage>
          )}
        </FormItem>
        <Button
          disabled={handleDisabled(isSubmitting, errors)}
          data-cy="submit"
        >
          {isSubmitting ? <Loader /> : "Register"}
        </Button>
        <InlineBox>
          <TextLink><ExternalLink target="__blank" href="https://cityos.io/terms.static">Terms of Service</ExternalLink></TextLink>
          <TextLink>|</TextLink>
          <TextLink><ExternalLink target="__blank" href="https://cityos.io/privacy.static">Privacy Policy</ExternalLink></TextLink>
        </InlineBox>
        <ErrorMessage>{errors.general}</ErrorMessage>
      </StyledForm>
    </Wrapper>
  );
};

const CompleteRegisterForm = withFormik({
  mapPropsToValues: props => {
    const params = new URLSearchParams(props.location.search);
    const email = params.get('username'), token = params.get('token'), cognito_id = params.get('id');

    return {
      email,
      password: "",
      gender: props.gender || "",
      first_name: "",
      last_name: "",
      birthday: props.birthday || new Date("January 31 1995 12:30"),
      token,
      cognito_id,
    }
  },
  validationSchema: Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-z]/, "Password must have lowerrcase characters")
      .matches(/[A-Z]/, "Password must have uppercase characters")
      .matches(/\d/, "Password must have numeric characters")
      .matches(/[\W]/, "Password must have symbol characters")
      .max(30, "Password is too long - should be 30 chars maximum."),
    confirmPassword: Yup.string().required("Password is required")
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    first_name: Yup.string().required("Please enter your first name."),
    last_name: Yup.string().required("Please enter your last name."),
    gender: Yup.string().required("Please choose a gender."),
    birthday: Yup.string().required("Birthday is required").test(
      "birthday",
      "You must be older than 13",
      value => {
        return moment(new Date()).diff(moment(value),'years') > 13;
      }
    )
  }),
  handleSubmit({birthday, confirmPassword, ...payload}, bag) {
    const data ={ ...payload, birthday: birthday.getTime() / 1000 };

    bag.props.completeSignup(data, {
      setSubmitting: bag.setSubmitting,
      setFieldError: bag.setFieldError,
      history: bag.props.history
    });
  }
})(FormikForm);

export default withRouter(
  connect(
    null,
    { completeSignup }
  )(CompleteRegisterForm)
);
