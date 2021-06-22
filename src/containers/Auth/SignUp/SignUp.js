import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

import { FormWrapper, StyledForm } from "../../../hoc/Layout/elements";
import Input from "../../../components/UI/Forms/Input/Input";
import Button from "../../../components/UI/Forms/Button/Button";
import Heading from "../../../components/UI/Headings/Heading";
import Message from "../../../components/UI/Message/Message";

import * as actions from "../../../store/actions";

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 0;
`;

const SignUpSchema = Yup.object().shape({
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
    .required("The Password is required.")
    .min(8, "Too Short")
    .matches(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      "Must contain 1 Uppercase, 1 Lowercase, 1 Digit and special character."
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], `Password does not match`)
    .required("Type in your Password to confirm."),
});

const SignUp = ({ signUp, loading, error, cleanUp }) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={SignUpSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await signUp(values);
        //setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid }) => (
        <FormWrapper>
          <Heading noMargin size="h1" color="white">
            signup for an account
          </Heading>
          <Heading bold size="h4" color="white">
            Fill in your details to register your new account
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
              loading={loading ? "Signing up" : null}
              type="submit"
            >
              SignUp
            </Button>
            <MessageWrapper>
              <Message error show={error}>
                {error}
              </Message>
            </MessageWrapper>
          </StyledForm>
        </FormWrapper>
      )}
    </Formik>
  );
};

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
  error: auth.error,
});

const mapDispatchToProps = {
  signUp: actions.signUp,
  cleanUp: actions.clean,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
