import React from 'react';
import MainContainer from '../components/Containers/MainContainer';
import KeyboardAvoidingContainer from '../components/Containers/KeyboardAvoidingContainer';
import RegularText from '../components/Texts/RegularText';

const Login = () => {
  return (
    <MainContainer>
      <KeyboardAvoidingContainer>
        <RegularText style={{ marginBottom: 25 }}>
          Enter your account credentials
        </RegularText>
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
};

export default Login;
