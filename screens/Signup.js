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
import PressableText from '../components/Texts/PressableText';

const { primary } = colors;

const Signup = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  const moveTo = (screen, payload) => {
    navigation.navigate(screen, { ...payload });
  };

  const handleSignup = async (credentials, setSubmitting) => {
    try {
      setMessage(null);
      // call backend

      // move to next page
      moveTo('EmailVerification');
      setSubmitting(false);
    } catch (err) {
      setMessage(`Signup Failed: ${error.message}`);
      setSubmitting(false);
    }
  };

  return (
    <MainContainer>
      <KeyboardAvoidingContainer>
        <RegularText style={{ marginBottom: 25 }}>
          Enter your account credentials
        </RegularText>
        <Formik
          initialValues={{
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            if (
              values.fullName == '' ||
              values.email == '' ||
              values.password == '' ||
              values.confirmPassword == ''
            ) {
              setMessage('Please fill in all fields');
              setSubmitting(false);
            } else if (values.password !== values.confirmPassword) {
              setMessage('Confirm password does not matched');
              setSubmitting(false);
            } else {
              handleSignup(values, setSubmitting);
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
            <>
              <StyledTextInput
                label='Full Name'
                icon='account'
                placeholder='John Doe'
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                value={values.fullName}
                style={{ marginBottom: 15 }}
              />
              <StyledTextInput
                label='Email Address'
                icon='email-variant'
                placeholder='email@example.com'
                keyboardType='email-address'
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                style={{ marginBottom: 15 }}
              />
              <StyledTextInput
                label='Password'
                icon='lock-open'
                placeholder='********'
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                isPassword={true}
                style={{ marginBottom: 15 }}
              />
              <StyledTextInput
                label='Confirm Password'
                icon='lock-open'
                placeholder='********'
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                isPassword={true}
                style={{ marginBottom: 15 }}
              />
              <MsgBox style={{ marginBottom: 25 }} success={isSuccessMessage}>
                {message || ' '}
              </MsgBox>
              {!isSubmitting && (
                <RegularButton onPress={handleSubmit}>Signup</RegularButton>
              )}
              {isSubmitting && (
                <RegularButton disabled={true}>
                  <ActivityIndicator
                    size='small'
                    color={primary}
                  ></ActivityIndicator>
                </RegularButton>
              )}
              <PressableText
                style={{ paddingVertical: 15 }}
                onPress={() => {
                  moveTo('Login');
                }}
              >
                Sign in to an existing account
              </PressableText>
            </>
          )}
        </Formik>
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
};

export default Signup;
