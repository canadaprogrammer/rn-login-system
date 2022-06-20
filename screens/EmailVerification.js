import React, { useState } from 'react';
import MainContainer from '../components/Containers/MainContainer';
import KeyboardAvoidingContainer from '../components/Containers/KeyboardAvoidingContainer';
import RegularText from '../components/Texts/RegularText';
import RegularButton from '../components/Buttons/RegularButton';
import { ActivityIndicator } from 'react-native';
import { colors } from '../components/colors';
import IconHeader from '../components/Icons/IconHeader';
import StyledCodeInput from '../components/Inputs/StyledCodeInput';
import ResendTimer from '../components/Timers/ResendTimer';

const { primary, secondary, lightGray } = colors;

const EmailVerification = () => {
  // Code Input
  const MAX_CODE_LENGTH = 4;
  const [code, setCode] = useState('');
  const [pinReady, setPinReady] = useState(false);

  const [message, setMessage] = useState('');
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  const [verifying, setVerifying] = useState(false);

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

  const handleEmailVerification = async (credentials, setSubmitting) => {
    try {
      setMessage(null);
      // call backend

      // move to next page

      setSubmitting(false);
    } catch (error) {
      setMessage(`Login Failed: ${error.message}`);
      setSubmitting(false);
    }
  };

  return (
    <MainContainer>
      <KeyboardAvoidingContainer>
        <IconHeader name='lock-open' style={{ marginBottom: 30 }} />
        <RegularText style={{ marginBottom: 25, textAlign: 'center' }}>
          Enter the 4-digit code sent to your email
        </RegularText>
        <StyledCodeInput
          code={code}
          setCode={setCode}
          maxLength={MAX_CODE_LENGTH}
          setPinReady={setPinReady}
        />

        {!verifying && pinReady && (
          <RegularButton onPress={handleEmailVerification}>
            Verify
          </RegularButton>
        )}
        {!verifying && !pinReady && (
          <RegularButton
            disabled={true}
            style={{ backgroundColor: secondary }}
            textStyle={{ color: lightGray }}
          >
            Verify
          </RegularButton>
        )}
        {verifying && (
          <RegularButton disabled={true}>
            <ActivityIndicator size='small' color={primary}></ActivityIndicator>
          </RegularButton>
        )}
        <ResendTimer
          activeResend={activeResend}
          setActiveResend={setActiveResend}
          resendStatus={resendStatus}
          resendingEmail={resendingEmail}
          resendEmail={resendEmail}
        />
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
};

export default EmailVerification;
