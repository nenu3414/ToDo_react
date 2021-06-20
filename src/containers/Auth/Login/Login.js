import React from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import { FormWrapper } from "../../../hoc/Layout/elements";
import StyledForm from "../../../hoc/Layout/elements";
import Input from "../../../components/UI/Forms/Input/Input";
import Button from "../../../components/UI/Forms/Button/Button";
import Heading from "../../../components/UI/Headings/Heading";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email ID.")
    .required("Email ID is required."),
  password: Yup.string().required("The Password is required."),
});

const Login = () => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
      }}
    >
      {({ isSubmitting, isValid }) => (
        <FormWrapper>
          <Heading noMargin size="h1" color="white">
            login into your account
          </Heading>
          <Heading bold size="h4" color="white">
            Fill in your details to login into your account
          </Heading>
          <StyledForm>
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
            <Button disabled={!isValid} type="submit">
              Login
            </Button>
          </StyledForm>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default Login;
