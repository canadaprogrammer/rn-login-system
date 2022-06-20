import React, { useState } from 'react';
import MainContainer from '../components/Containers/MainContainer';
import KeyboardAvoidingContainer from '../components/Containers/KeyboardAvoidingContainer';
import RegularText from '../components/Texts/RegularText';
import RegularButton from '../components/Buttons/RegularButton';
import { ActivityIndicator } from 'react-native';
import { colors } from '../components/colors';
import IconHeader from '../components/Icons/IconHeader';
import StyledCodeInput from '../components/Inputs/StyledCodeInput';
const { primary, secondary, lightGray } = colors;

const EmailVerification = () => {
  // Code Input
  const MAX_CODE_LENGTH = 4;
  const [code, setCode] = useState('');
  const [pinReady, setPinReady] = useState(false);

  const [verifying, setVerifying] = useState(false);

  const handleEmailVerification = () => {};

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
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
};

export default EmailVerification;
