import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import MyLocationHOC from '../../map/containers/MyLocationHOC'

import sarajevo_coordinates from "../../map/data/sarajevo_coordinates";
import Loader from "../../loader/components/Loader";
import { addNewDevice } from "../actions/dashboardActionCreators";
import { showNotification } from "../../notification/actions/notificationActionCreators";
import DeviceMap from "./DeviceMap";

const Wrapper = styled.div`
  padding: 128px 32px;
  max-width: 992px;
  margin: 0 auto;
  width: 100%;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  width: 100%;
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
  max-width: 512px;
`;

const InputRadio = styled.input`
  margin: 0;
`;

const LabelRadio = styled.label`
  margin: 0 10px;
`;

const Tip = styled.p`
  font-size: 0.8rem;
  margin-bottom: 10px;
`;

const Footer = styled.footer`
  display: flex;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: ${props => props.theme.primary};
  color: #fff;
  border: 0;
  cursor: pointer;
  height: 36px;
  border-radius: 2px;
  font-size: 0.8rem;
  padding: 0 12px;
  margin-right: 10px;
  :disabled {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const CancelBtn = styled(Link)`
  border: 1px solid ${props => props.theme.primary};
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  border-radius: 2px;
  font-size: 0.8rem;
  padding: 0 12px;
`;

const ErrorMessage = styled.span`
  font-size: 0.8rem;
  color: #b00e23;
`;

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  type: Yup.string().required("Type is required"),
  model: Yup.string().required("Model is required")
});

const DeviceNewForm = props => (
  <Wrapper>
    <Formik
      enableReinitialize={true}
      initialValues={{
        name: props.name || "",
        type: props.type || "indoor",
        coordinates: props.coordinates || {
          lng: props.myPosition ? props.myPosition.coords.longitude : sarajevo_coordinates.lng,
          lat: props.myPosition ? props.myPosition.coords.latitude : sarajevo_coordinates.lat
        },
        model: props.model || "BOXY"
      }}
      validationSchema={ValidationSchema}
      onSubmit={(values, actions) => {
        const payload = {
          name: values.name,
          model: values.model,
          coordinates: values.coordinates,
          indoor: values.type === "indoor" ? true : false
        };
        props.addNewDevice(payload, {
          setSubmitting: actions.setSubmitting,
          setFieldError: actions.setFieldError,
          history: props.history,
          showNotification: props.showNotification
        });
      }}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        isSubmitting,
        handleBlur,
        handleChange
      }) => (
          <StyledForm>
            <FormItem>
              <label>Device name:</label>
              <Input type="text" name="name" placeholder="Name" data-cy="name" />
              {touched.name && errors.name && (
                <ErrorMessage>{errors.name}</ErrorMessage>
              )}
            </FormItem>
            <FormItem>
              <label>Type:</label>
              <FormRadioItem>
                <InputRadio
                  id="indoor"
                  name="type"
                  type="radio"
                  value="indoor"
                  checked={values.type === "indoor"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  data-cy="type"
                />
                <LabelRadio htmlFor="indoor">Indoor</LabelRadio>
                <InputRadio
                  id="outdoor"
                  name="type"
                  type="radio"
                  value="outdoor"
                  checked={values.type === "outdoor"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  data-cy="type"
                />
                <LabelRadio htmlFor="outdoor">Outdoor</LabelRadio>
              </FormRadioItem>
              {touched.type && errors.type && (
                <ErrorMessage>{errors.type}</ErrorMessage>
              )}
            </FormItem>
            <FormItem>
              <label>Location:</label>
              <Tip>
                Drag and drop the marker to set device’s location, or enter your
                address in the search bar.
            </Tip>
              <DeviceMap
                setFieldValue={setFieldValue}
                marker={{
                  longitude: values.coordinates.lng,
                  latitude: values.coordinates.lat
                }}
              />
            </FormItem>
            <Footer>
              <Button disabled={isSubmitting} data-cy="submit">
                {isSubmitting ? <Loader /> : "Add device"}
              </Button>
              <CancelBtn to="/dashboard">Cancel</CancelBtn>
            </Footer>
            <ErrorMessage>{errors.general}</ErrorMessage>
          </StyledForm>
        )}
    </Formik>
  </Wrapper>
);

export default withRouter(
  connect(
    null,
    { addNewDevice, showNotification }
  )(MyLocationHOC(DeviceNewForm))
);
