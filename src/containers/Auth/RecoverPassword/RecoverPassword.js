import React from "react";
import styled from "styled-components";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

import Heading from "../../../components/UI/Headings/Heading";
import { FormWrapper, StyledForm } from "../../../hoc/Layout/elements";
import Input from "../../../components/UI/Forms/Input/Input";
import Button from "../../../components/UI/Forms/Button/Button";
import Message from "../../../components/UI/Message/Message";
import * as actions from "../../../store/actions";

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 0;
`;

const RecoverSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email ID.")
    .required("Email ID is required."),
});

const RecoverPassword = ({ error, loading, sendEmail }) => {
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={RecoverSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await sendEmail(values);
        //setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid }) => (
        <FormWrapper>
          <Heading noMargin size="h1" color="white">
            Recover your Password
          </Heading>
          <Heading size="h4" bold color="white">
            Type in your email to recover your password
          </Heading>
          <StyledForm>
            <Field
              type="email"
              name="email"
              placeholder="Your Email ID"
              component={Input}
            />
            <Button
              disabled={!isValid || isSubmitting}
              loading={loading ? "Sending recovery email" : null}
              type="submit"
            >
              Send Recovery Email
            </Button>
            <MessageWrapper>
              <Message error show={error}>
                {error}
              </Message>
            </MessageWrapper>
            <MessageWrapper>
              <Message success show={error === false}>
                Recovery Email sent successfully
              </Message>
            </MessageWrapper>
          </StyledForm>
        </FormWrapper>
      )}
    </Formik>
  );
};

const mapStateToProps = ({ auth }) => ({
  loading: auth.recoverPassword.loading,
  error: auth.recoverPassword.error,
});

const mapDispatchToProps = {
  sendEmail: actions.recoverPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);
