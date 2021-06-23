import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { FormWrapper, StyledForm } from "../../../hoc/Layout/elements";
import Input from "../../../components/UI/Forms/Input/Input";
import Button from "../../../components/UI/Forms/Button/Button";
import Heading from "../../../components/UI/Headings/Heading";
import Message from "../../../components/UI/Message/Message";
import Modal from "../../../components/UI/Modal/Modal";

import * as actions from "../../../store/actions";

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 4rem;
  width: 100%;
  padding: 0 3rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 2rem;
  justify-content: space-around;
`;

const DeleteWrapper = styled.div`
  cursor: pointer;
  color: var(--color-errorRed);
  font-size: 1.3rem;
  font-weight: 700;
  margin-top: -0.8rem;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(2px);
  }
`;

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required.")
    .min(3, "Too Short")
    .max(25, "Too Long"),
  lastName: Yup.string()
    .required("Last Name is required.")
    .min(3, "Too Short")
    .max(25, "Too Long"),
  email: Yup.string()
    .email("Invalid Email ID.")
    .required("Email ID is required."),
  password: Yup.string()
    .min(8, "Too Short")
    .oneOf([Yup.ref("confirmPassword"), null], `Password does not match`)
    .matches(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      "Must contain 1 Uppercase, 1 Lowercase, 1 Digit and special character."
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    `Password does not match`
  ),
});

const Profile = ({
  loading,
  error,
  firebase,
  editProfile,
  cleanUp,
  loadingDelete,
  errorDelete,
  deleteUser,
}) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);
  const [modalOpened, setmodalOpened] = useState(false);
  if (!firebase.profile.isLoaded) return null;
  return (
    <>
      <Formik
        initialValues={{
          firstName: firebase.profile.firstName,
          lastName: firebase.profile.lastName,
          email: firebase.auth.email,
          password: "",
          confirmPassword: "",
        }}
        validationSchema={ProfileSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await editProfile(values);
          //setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid }) => (
          <FormWrapper>
            <Heading noMargin size="h1" color="white">
              edit your profile
            </Heading>
            <Heading bold size="h4" color="white">
              Here you can edit your profile
            </Heading>
            <StyledForm>
              <Field
                type="text"
                name="firstName"
                placeholder="First Name"
                component={Input}
              />
              <Field
                type="text"
                name="lastName"
                placeholder="Last Name"
                component={Input}
              />
              <Field
                type="email"
                name="email"
                autoComplete="off"
                placeholder="Your Email ID"
                component={Input}
              />
              <Field
                type="password"
                name="password"
                placeholder="Your Password"
                component={Input}
              />
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Re-type your Password"
                component={Input}
              />
              <Button
                disabled={!isValid || isSubmitting}
                loading={loading ? "Editing" : null}
                type="submit"
              >
                Update
              </Button>
              <MessageWrapper>
                <Message error show={error}>
                  {error}
                </Message>
              </MessageWrapper>
              <MessageWrapper>
                <Message success show={error === false}>
                  Profile updated successfully
                </Message>
              </MessageWrapper>
              <DeleteWrapper onClick={() => setmodalOpened(true)}>
                Delete my Account
              </DeleteWrapper>
            </StyledForm>
          </FormWrapper>
        )}
      </Formik>
      <Modal opened={modalOpened} close={() => setmodalOpened(false)}>
        <Heading noMargin size="h1" color="white">
          delete your account
        </Heading>
        <Heading bold size="h4" color="white">
          Do you really want to delete your account?
        </Heading>
        <ButtonsWrapper>
          <Button
            onClick={() => deleteUser()}
            color="red"
            contain
            disabled={loadingDelete}
            loading={loadingDelete ? "Deleting" : null}
          >
            Delete
          </Button>
          <Button color="main" contain onClick={() => setmodalOpened(false)}>
            Cancel
          </Button>
        </ButtonsWrapper>
        <MessageWrapper>
          <Message error show={errorDelete}>
            {errorDelete}
          </Message>
        </MessageWrapper>
      </Modal>
    </>
  );
};

const mapStateToProps = ({ firebase, auth }) => ({
  firebase,
  loading: auth.profileEdit.loading,
  error: auth.profileEdit.error,
  loadingDelete: auth.deleteUser.loading,
  errorDelete: auth.deleteUser.error,
});

const mapDispatchToProps = {
  editProfile: actions.editProfile,
  cleanUp: actions.clean,
  deleteUser: actions.deleteUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
