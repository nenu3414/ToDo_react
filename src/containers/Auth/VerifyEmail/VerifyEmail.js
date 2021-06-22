import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { FormWrapper } from "../../../hoc/Layout/elements";
import Heading from "../../../components/UI/Headings/Heading";
import Button from "../../../components/UI/Forms/Button/Button";
import Message from "../../../components/UI/Message/Message";
import * as actions from "../../../store/actions";

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 0;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VerifyEmail = ({ sendVerification, error, loading, cleanUp }) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);
  return (
    <FormWrapper>
      <Wrapper>
        <Heading color="white" size="h1">
          verify your email
        </Heading>
        <Heading color="white" size="h3" bold>
          Go to your email inbox and please verify your email.
        </Heading>
        <Button
          loading={loading ? "Sending Email" : null}
          disabled={loading}
          onClick={() => sendVerification()}
        >
          Re-send verification email
        </Button>
        <MessageWrapper>
          <Message error show={error}>
            {error}
          </Message>
        </MessageWrapper>
        <MessageWrapper>
          <Message success show={error === false}>
            Email sent successfully
          </Message>
        </MessageWrapper>
      </Wrapper>
    </FormWrapper>
  );
};

const mapStateToProps = ({ auth }) => ({
  loading: auth.verifyEmail.loading,
  error: auth.verifyEmail.error,
});

const mapDispatchToProps = {
  sendVerification: actions.verifyEmail,
  cleanUp: actions.clean,
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
