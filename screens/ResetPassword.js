import React, { useState } from 'react';
import MainContainer from '../components/Containers/MainContainer';
import KeyboardAvoidingContainer from '../components/Containers/KeyboardAvoidingContainer';
import RegularText from '../components/Texts/RegularText';
import StyledTextInput from '../components/Inputs/StyledTextInput';
import { Formik } from 'formik';
import MsgBox from '../components/Texts/MsgBox';
import RegularButton from '../components/Buttons/RegularButton';
import { ActivityIndicator } from 'react-native';
import { colors } from '../components/colors';
import StyledCodeInput from '../components/Inputs/StyledCodeInput';
import ResendTimer from '../components/Timers/ResendTimer';
import styled from 'styled-components/native';

const { primary } = colors;

const FormWrapper = styled.View`
  ${(props) => {
    return props.pinReady ? `opacity: 1` : `opacity: 0.3`;
  }}
`;

const ResetPassword = () => {
  const [message, setMessage] = useState('');
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  // Code Input
  const MAX_CODE_LENGTH = 4;
  const [code, setCode] = useState('');
  const [pinReady, setPinReady] = useState(false);

  // Resending Email
  const [activeResend, setActiveResend] = useState(false);
  const [resendStatus, setResendStatus] = useState('Resend');
  const [resendingEmail, setResendingEmail] = useState(false);

  const resendEmail = async (triggerTimer) => {
    try {
      setResendingEmail(true);

      // Make Request to Backend
      // Update setResendStatus to 'Failed!' or 'Sent!'

      setResendingEmail(false);
      // Hold on Briefly
      setTimeout(() => {
        setResendStatus('Resend');
        setActiveResend(false);
        triggerTimer();
      }, 5000);
    } catch (error) {
      setResendingEmail(false);
      setResendStatus('Failed!');
      alert('Email Resend Failed: ' + error.message);
    }
  };

  const handleOnSubmit = async (credentials, setSubmitting) => {
    try {
      setMessage(null);
      // call backend

      // move to next page

      setSubmitting(false);
    } catch (error) {
      setMessage(`Request Failed: ${error.message}`);
      setSubmitting(false);
    }
  };

  return (
    <MainContainer>
      <KeyboardAvoidingContainer>
        <RegularText style={{ textAlign: 'center' }}>
          Enter the 4-digit code sent to your email
        </RegularText>
        <StyledCodeInput
          code={code}
          setCode={setCode}
          maxLength={MAX_CODE_LENGTH}
          setPinReady={setPinReady}
        />
        <ResendTimer
          activeResend={activeResend}
          setActiveResend={setActiveResend}
          resendStatus={resendStatus}
          resendingEmail={resendingEmail}
          resendEmail={resendEmail}
          style={{ marginBottom: 25 }}
        />
        <Formik
          initialValues={{ newPassword: '', confirmNewPassword: '' }}
          onSubmit={(values, { setSubmitting }) => {
            if (values.newPassword == '' || values.confirmNewPassword == '') {
              setMessage('Please fill in all fields');
              setSubmitting(false);
            } else if (values.newPassword !== values.confirmNewPassword) {
              setMessage('Confirm password does not matched');
              setSubmitting(false);
            } else {
              handleOnSubmit(values, setSubmitting);
            }
          }}
        >
          {({
            handleChange,
            handleBlur,
            values,
            isSubmitting,
            handleSubmit,
          }) => (
            <FormWrapper pinReady={pinReady}>
              <StyledTextInput
                label='New Password'
                icon='lock-open-variant'
                placeholder='********'
                onChangeText={handleChange('newPassword')}
                onBlur={handleBlur('newPassword')}
                value={values.newPassword}
                isPassword={true}
                style={{ marginBottom: 25 }}
                editable={pinReady}
              />
              <StyledTextInput
                label='Confirm Password'
                icon='lock-open-variant'
                placeholder='********'
                onChangeText={handleChange('confirmNewPassword')}
                onBlur={handleBlur('confirmNewPassword')}
                value={values.confirmNewPassword}
                isPassword={true}
                style={{ marginBottom: 25 }}
                editable={pinReady}
              />
              <MsgBox style={{ marginBottom: 25 }} success={isSuccessMessage}>
                {message || ' '}
              </MsgBox>
              {!isSubmitting && (
                <RegularButton disabled={pinReady} onPress={handleSubmit}>
                  Submit
                </RegularButton>
              )}
              {isSubmitting && (
                <RegularButton disabled={true}>
                  <ActivityIndicator
                    size='small'
                    color={primary}
                  ></ActivityIndicator>
                </RegularButton>
              )}
            </FormWrapper>
          )}
        </Formik>
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
};

export default ResetPassword;
