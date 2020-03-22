import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { withFormik, Form, Field } from "formik";

import Loader from "../../loader/components/Loader";
import sarajevo_coordinates from "../../map/data/sarajevo_coordinates";
import Modal from "../../commonComponents/Modal";
import DeviceMap from "./DeviceMap";
import {
  getDevice,
  updateDevice,
  resetDevice,
  deleteDevice
} from "../actions/dashboardActionCreators";
import { showNotification } from "../../notification/actions/notificationActionCreators";
import { ReactComponent as DeleteIcon } from "../assets/trash.svg";
import Helpers from "../../helpers/helpers";

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

const Heading = styled.p`
  color: #808080;
  margin-bottom: .8rem;
`;

const SubHeading = styled.p`
  color: #cccccc;
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
  color: #808080;
  height: 36px;
  font-size: 1rem;
  padding: 0 4px 0 15px;
  outline: 0;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 2px;
  max-width: 512px;
`;

const Select = styled.select`
  color: #808080;
  height: 36px;
  font-size: 1rem;
  padding: 0 4px 0 15px;
  outline: 0;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 2px;
  max-width: 180px;
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
  color: #cccccc;
  `;

const Footer = styled.footer`
  display: flex;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #8de3f4;
  color: #3ea4b7;
  border: 1px solid #3ea4b7;
  cursor: pointer;
  height: 36px;
  border-radius: 2px;
  font-size: 0.8rem;
  padding: 0 12px;
  margin-right: 10px;
  width: 120px;
  :disabled {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const CancelBtn = styled(Link)`
  border: 1px solid #b6b6b6;
  color: #808080;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  border-radius: 2px;
  font-size: 0.8rem;
  padding: 0 12px;
  width: 120px;
`;

const ErrorMessage = styled.span`
  font-size: 0.8rem;
  color: #b00e23;
`;

const DeleteDevice = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
`;

const DeleteDeviceText = styled.span`
  text-transform: uppercase;
  margin: 0 10px;
  font-size: 0.8rem;
  color: #ff3b30;
  letter-spacing: 1px;
`;

const Name = styled(Link)`
  color: #808080;
  font-weight: 500;
  font-size: 2rem;
  font-family: Galano Classic;
  :visited{
    color: #808080;
  }
`;

const TitleContainer = styled.div`
  margin-bottom: 50px;
`;


class FormikForm extends React.Component {
  state = {
    deleteModal: false
  };

  componentDidMount = () => {
    const { match, getDevice } = this.props;
    const id = match.params.id;

    getDevice(id);
  };

  componentWillUnmount = () => {
    const { setSubmitting, resetDevice } = this.props;

    setSubmitting(false);
    resetDevice();
  };

  toggleDeleteModal = () => {
    this.setState(prevState => ({
      deleteModal: !prevState.deleteModal
    }));
  };

  render() {
    const {
      values,
      errors,
      touched,
      isSubmitting,
      handleBlur,
      handleChange,
      setFieldValue,
      deleteDevice,
      history,
      showNotification,
      device
    } = this.props;
    const { deleteModal } = this.state;
    const { id: token } = this.props.match.params;

    return (
      <Wrapper>
        <StyledForm>
          <TitleContainer>
            <SubHeading>Manage device:</SubHeading>
            <Name title={device.name} to={`/dashboard/devices/${device.device_id}`}>{Helpers.trimString(device.name, 30)}</Name>
          </TitleContainer>
          <FormItem>
            <Heading>Device name</Heading>
            <Input type="text" name="name" placeholder="Name" />
            {touched.name && errors.name && (
              <ErrorMessage>{errors.name}</ErrorMessage>
            )}
          </FormItem>
          <FormItem>
            <Heading>Type:</Heading>
            <Select
              name="type"
              value={values.type}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{ display: 'block' }}
            >
              <option value="indoor" label="Indoor">Indoor</option>
              <option value="outdoor" label="Outdoor">Outdoor</option>
            </Select>
            {touched.type && errors.type && (
              <ErrorMessage>{errors.type}</ErrorMessage>
            )}
          </FormItem>
          <FormItem>
            <Heading>Location:</Heading>
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
          <DeleteDevice onClick={this.toggleDeleteModal}>
            <DeleteIcon  stroke="#5a5a5a" />
            <DeleteDeviceText>Delete device</DeleteDeviceText>
          </DeleteDevice>
          <Footer>
            <Button disabled={isSubmitting}>
              {isSubmitting ? <Loader /> : "SAVE"}
            </Button>
            <CancelBtn to="/dashboard">CANCEL</CancelBtn>
          </Footer>
          <ErrorMessage>{errors.general}</ErrorMessage>
        </StyledForm>
        {deleteModal ? (
          <Modal
            title="Delete device"
            text="Are you sure you want to delete this device? All your data will be permanently erased."
            confirmText="Delete"
            action={() =>
              deleteDevice(
                { token: token, name: this.props.device.name },
                {
                  history,
                  showNotification
                }
              )
            }
            dismiss={this.toggleDeleteModal}
          />
        ) : null}
      </Wrapper>
    );
  }
}

const DeviceUpdateForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => ({
    token: props.device.device_id || "",
    name: props.device.name || "",
    type: props.device.type || "",
    coordinates: props.device.location || {
      lng: sarajevo_coordinates.lng,
      lat: sarajevo_coordinates.lat
    },
    model: props.device.model || "BOXY",
    city: props.device.city || 'Sarajevo'
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string().trim().required("Name is required")
      .max(30, "Name is too long - should be maximum 30 chars long."),
    type: Yup.string().required("Type is required"),
    model: Yup.string().required("Model is required")
  }),
  handleSubmit(values, bag) {
    const payload = {
      token: values.token,
      name: values.name,
      model: values.model,
      coordinates: values.coordinates,
      indoor: values.type === "indoor" ? true : false,
      city: values.city
    };
    bag.props.updateDevice(payload, {
      setSubmitting: bag.setSubmitting,
      setFieldError: bag.setFieldError,
      history: bag.props.history,
      showNotification: bag.props.showNotification
    });
  }
})(FormikForm);

const mapStateToProps = state => {
  return {
    device: state.dashboard.device
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { getDevice, updateDevice, resetDevice, showNotification, deleteDevice }
  )(DeviceUpdateForm)
);
