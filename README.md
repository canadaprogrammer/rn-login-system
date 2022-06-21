# Login System

- React Native

## Initialize

- ```bash
  expo init rn-login-system
  blank
  cd rn-login-system
  expo install formik styled-components
  expo start
  ```

- On `App.js`

  - ```js
    import { StatusBar } from 'expo-status-bar';

    export default function App() {
      return (
        <>
          <StatusBar style='light' />
        </>
      );
    }
    ```

## Login Screen - Default

- Create `/components/colors.js`

  - ```js
    export const colors = {
      primary: '#222831',
      secondary: '#393e46',
      tertiary: '#eee',
      accent: '#00adb5',
      darkGray: '#111827',
      lightGray: '#6b7280',
      white: '#fff',
      black: '#000',
      success: '#22c55e',
      fail: '#ef4444',
    };
    ```

- Create `/components/shared.js`

  - ```js
    import Constants from 'expo-constants';
    import { Dimensions } from 'react-native';

    export const StatusBarHeight = Constants.statusBarHeight;
    export const ScreenWidth = Dimensions.get('screen').width;
    export const ScreenHeight = Dimensions.get('screen').height;
    ```

- Create `/components/Text/SmallText.js`

  - ```js
    import React from 'react';
    import styled from 'styled-components/native';
    import { colors } from '../colors';

    const { tertiary } = colors;
    const StyledText = styled.Text`
      font-size: 13px;
      color: ${tertiary};
      text-align: left;
    `;

    const SmallText = (props) => {
      return <StyledText {...props}>{props.children}</StyledText>;
    };

    export default SmallText;
    ```

- Create `/components/Text/RegularText.js` and `/components/Text/BigText.js`

  - They are almost the same with `SmallText.js` except belows:

    - `text-align: left;` and `text-align: center;`

    - `font-size: 15px;` and `font-size: 30px;`

- Create `/components/Containers/MainContainer.js`

  - ```js
    import React from 'react';
    import styled from 'styled-components/native';
    import { StatusBarHeight } from '../shared';
    import { colors } from '../colors';

    const { primary } = colors;
    const StyledView = styled.View`
      flex: 1;
      padding: 25px;
      padding-top: ${StatusBarHeight + 30}px;
      background-color: ${primary};
    `;
    const MainContainer = (props) => {
      return <StyledView {...props}>{props.children}</StyledView>;
    };

    export default MainContainer;
    ```

- Create `/components/Containers/KeyboardAvoidingContainer.js`

  - ```js
    import React from 'react';
    import {
      KeyboardAvoidingView,
      Keyboard,
      ScrollView,
      Pressable,
      Platform,
    } from 'react-native';

    const KeyboardAvoidingContainer = (props) => {
      return (
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: 'transparent' }}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={60}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Pressable onPress={Keyboard.dismiss}>{props.children}</Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      );
    };

    export default KeyboardAvoidingContainer;
    ```

- Create `/screens/Login.js`

  - ```js
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
    ```

- On `/App.js`

  - ```js
    import { StatusBar } from 'expo-status-bar';
    import Login from './screens/Login';

    export default function App() {
      return (
        <>
          <StatusBar style='light' />
          <Login />
        </>
      );
    }
    ```

## Login Screen - Email Input

- Create `/components/Inputs/StyledTextInput.js`

  - ```js
    import React, { useState } from 'react';
    import { View } from 'react-native';
    import styled from 'styled-components/native';
    import { colors } from '../colors';
    import { MaterialCommunityIcons } from '@expo/vector-icons';
    import SmallText from '../Texts/SmallText';

    const { primary, secondary, tertiary, accent, lightGray } = colors;
    const InputField = styled.TextInput`
      background-color: ${primary};
      padding: 15px;
      padding-left: 65px;
      padding-right: 55px;
      border-radius: 10px;
      font-size: 16px;
      height: 60px;
      margin-top: 3px;
      margin-bottom: 10px;
      color: ${tertiary};
      border-color: ${secondary};
      border-width: 2px;
    `;

    const LeftIcon = styled.View`
      position: absolute;
      top: 35px;
      left: 15px;
      z-index: 1;
      border-right-width: 2px;
      border-color: ${secondary};
      padding-right: 10px;
    `;

    const StyledTextInput = ({ icon, label, ...props }) => {
      const [inputBackgroundColor, setInputBackgroundColor] = useState(primary);

      const customOnBlur = () => {
        props?.onBlur;
        setInputBackgroundColor(primary);
      };
      const customOnFocus = () => {
        props?.onFocus;
        setInputBackgroundColor(secondary);
      };
      return (
        <View>
          <LeftIcon>
            <MaterialCommunityIcons name={icon} size={30} color={accent} />
          </LeftIcon>
          <SmallText>{label}</SmallText>
          <InputField
            {...props}
            placeholderTextColor={lightGray}
            style={{ backgroundColor: inputBackgroundColor, ...props?.style }}
            onBlur={customOnBlur}
            onFocus={customOnFocus}
          />
        </View>
      );
    };

    export default StyledTextInput;
    ```

- On `/screens/Login.js`

  - ```js
    ...
    import StyledTextInput from '../components/Inputs/StyledTextInput';
    import { Formik } from 'formik';

    const Login = () => {
      return (
        ...
            <Formik initialValues={{ email: '' }}>
              {({ handleChange, handleBlur, values }) => (
                <>
                  <StyledTextInput
                    label='Email Address'
                    icon='email-variant'
                    placeholder='email@example.com'
                    keyboardType='email-address'
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    style={{ marginBottom: 25 }}
                  />
                </>
              )}
            </Formik>
          </KeyboardAvoidingContainer>
        ...
    ```

## Login Screen - Password Input

- On `/components/Inputs/StyledTextInput.js`

  - ```js
    ...
    const RightIcon = styled.TouchableOpacity`
      position: absolute;
      top: 35px;
      right: 15px;
      z-index: 1;
    `;

    const StyledTextInput = ({ icon, label, isPassword, ...props }) => {
      const [inputBackgroundColor, setInputBackgroundColor] = useState(primary);
      const [hidePassword, setHidePassword] = useState(true);
      ...
      return (
        ...
          <InputField
            ...
            secureTextEntry={isPassword && hidePassword}
          />
          {isPassword && (
            <RightIcon
              onPress={() => {
                setHidePassword(!hidePassword);
              }}
            >
              <MaterialCommunityIcons
                name={hidePassword ? 'eye-off' : 'eye'}
                size={30}
                color={tertiary}
              />
            </RightIcon>
          )}
        </View>
      ...
    ```

- On `/screens/Login.js`

  - ```js
    ...
        <Formik initialValues={{ email: '', password: '' }}>
          ...
              <StyledTextInput
                label='Password'
                icon='lock-open'
                placeholder='********'
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                isPassword={true}
                style={{ marginBottom: 25 }}
              />
            </>
          )}
        </Formik>
      ...
    ```

## Login Screen - Login Button and Message

- Create `/components/Texts/MsgBox.js`

  - ```js
    import React from 'react';
    import styled from 'styled-components/native';
    import { colors } from '../colors';

    const { success, fail } = colors;

    const StyledText = styled.Text`
      font-size: 13px;
      color: ${(props) => (props.success ? success : fail)};
      text-align: center;
    `;

    const MsgBox = (props) => {
      return <StyledText {...props}>{props.children}</StyledText>;
    };

    export default MsgBox;
    ```

- Create `/components/Buttons/RegularButton.js`

  - ```js
    import React from 'react';
    import styled from 'styled-components/native';
    import { colors } from '../colors';
    import RegularText from '../Texts/RegularText';

    const { primary, accent } = colors;

    const ButtonView = styled.TouchableOpacity`
      padding: 15px;
      background-color: ${accent};
      width: 100%;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      height: 60px;
    `;

    const RegularButton = (props) => {
      return (
        <ButtonView onPress={props.onPress} {...props}>
          <RegularText style={[{ color: primary }, { ...props?.textStyle }]}>
            {props.children}
          </RegularText>
        </ButtonView>
      );
    };

    export default RegularButton;
    ```

- Create `/components/Text/PressableText.js`

  - ```js
    import React from 'react';
    import styled from 'styled-components/native';
    import { colors } from '../colors';
    import SmallText from '../Texts/SmallText';

    const { accent } = colors;

    const StyledPressable = styled.Pressable`
      padding-vertical: 5px;
      align-self: center;
    `;

    const PressableText = (props) => {
      return (
        <StyledPressable onPress={props.onPress} {...props}>
          <SmallText style={{ color: accent }}>{props.children}</SmallText>
        </StyledPressable>
      );
    };

    export default PressableText;
    ```

- On `/screens/Login.js`

  - ```js
    import React, { useState } from 'react';
    ...
    import MsgBox from '../components/Texts/MsgBox';
    import RegularButton from '../components/Buttons/RegularButton';
    import { ActivityIndicator } from 'react-native';
    import { colors } from '../components/colors';
    import PressableText from '../components/Texts/PressableText';

    const { primary } = colors;

    const Login = () => {
      const [message, setMessage] = useState('');
      const [isSuccessMessage, setIsSuccessMessage] = useState(false);

      const handleLogin = async (credentials, setSubmitting) => {
        try {
          setMessage(null);
          // call backend

          // move to next page

          setSubmitting(false);
        } catch (err) {
          setMessage(`Login Failed: ${error.message}`);
          setSubmitting(false);
        }
      };

      return (
        ...
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={(values, { setSubmitting }) => {
                if (values.email == '' || values.password == '') {
                  setMessage('Please fill in all fields');
                  setSubmitting(false);
                } else {
                  handleLogin(values, setSubmitting);
                }
              }}
            >
              {({..., isSubmitting, handleSubmit }) => (
                <>
                  ...
                  <MsgBox style={{ marginBottom: 25 }} success={isSuccessMessage}>
                    {message || ' '}
                  </MsgBox>
                  {!isSubmitting && (
                    <RegularButton onPress={handleSubmit}>Login</RegularButton>
                  )}
                  {isSubmitting && (
                    <RegularButton disabled={true}>
                      <ActivityIndicator
                        size='small'
                        color={primary}
                      ></ActivityIndicator>
                    </RegularButton>
                  )}
                </>
              ...
    ```

- Create `/components/Containers/RowContainer.js`

  - ```js
    import React from 'react';
    import styled from 'styled-components/native';

    const StyledView = styled.View`
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: 15px;
    `;

    const RowContainer = (props) => {
      return <StyledView {...props}>{props.children}</StyledView>;
    };

    export default RowContainer;
    ```

- On `/screens/Login.js`

  - ```js
    import RowContainer from '../components/Containers/RowContainer';
    ...
                  <RowContainer>
                    <PressableText onPress={() => {}}>
                      New account sign up
                    </PressableText>
                    <PressableText onPress={() => {}}>
                      Forgot Password
                    </PressableText>
                  </RowContainer>
                </>
              )}
            </Formik>
            ...
    ```

## Sign Up Screen

- Create `/ screens/Signup.js`. It's similar with `Login.js`

  - ```js
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

    const Signup = () => {
      const [message, setMessage] = useState('');
      const [isSuccessMessage, setIsSuccessMessage] = useState(false);

      const handleSignup = async (credentials, setSubmitting) => {
        try {
          setMessage(null);
          // call backend

          // move to next page

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
                  (values.email == '') | (values.password == '') ||
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
                  <MsgBox
                    style={{ marginBottom: 25 }}
                    success={isSuccessMessage}
                  >
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
                    onPress={() => {}}
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
    ```

- ON `App.js`, change `Login` to `Signup`for seeing Signup page

## Email Verification Screen

- Create `/components/Icons/IconHeader.js`

  - ```js
    import React from 'react';
    import { MaterialCommunityIcons } from '@expo/vector-icons';
    import styled from 'styled-components/native';
    import { ScreenHeight } from '../shared';
    import { colors } from '../colors';

    const { secondary, accent } = colors;
    const IconBg = styled.View`
      background-color: ${secondary};
      width: ${ScreenHeight * 0.15}px;
      height: ${ScreenHeight * 0.15}px;
      border-radius: ${ScreenHeight * 0.2}px;
      justify-content: center;
      align-items: center;
      align-self: center;
    `;
    const IconHeader = ({ name, size, color, ...props }) => {
      return (
        <IconBg style={{ ...props.style }}>
          <MaterialCommunityIcons
            name={name}
            size={ScreenHeight * 0.08}
            color={color ? color : accent}
          />
        </IconBg>
      );
    };

    export default IconHeader;
    ```

- Create `/components/Inputs/StyledCodeInput.js`

  - ```js
    import React, { useRef, useState, useEffect } from 'react';
    import styled from 'styled-components/native';
    import { StatusBarHeight } from '../shared';
    import { colors } from '../colors';

    const { primary, secondary, tertiary, accent } = colors;
    const CodeInputSection = styled.View`
      flex: 1;
      align-items: center;
      justify-content: center;
      margin-vertical: 35px;
    `;

    const HiddenTextInput = styled.TextInput`
      position: absolute;
      width: 1px;
      height: 1px;
      opacity: 0;
    `;

    const CodeInputsContainer = styled.Pressable`
      width: 70%;
      flex-direction: row;
      justify-content: space-between;
    `;

    const CodeInput = styled.View`
      min-width: 15%;
      padding: 12px;
      border-bottom-width: 5px;
      border-radius: 10px;
      border-color: ${secondary};
    `;

    const CodeInputText = styled.Text`
      font-size: 22px;
      font-weight: bold;
      text-align: center;
      color: ${tertiary};
    `;

    const CodeInputFocused = styled(CodeInput)`
      border-color: ${accent};
    `;

    const StyledCodeInput = ({ code, setCode, maxLength, setPinReady }) => {
      const codeDigitsArray = new Array(maxLength).fill(0);
      const [inputContainerIsFocused, setInputContainerIsFocused] =
        useState(false);

      // ref for text input
      const textInputRef = useRef(null);

      const handleOnPress = () => {
        setInputContainerIsFocused(true);
        textInputRef?.current?.focus();
      };

      const handleOnSubmitEditing = () => {
        setInputContainerIsFocused(false);
      };

      useEffect(() => {
        // Toggle pinReady
        setPinReady(code.length === maxLength);
        return () => setPinReady(false);
      }, [code]);

      const toCodeDigitInput = (value, index) => {
        const emptyInputChar = ' ';
        const digit = code[index] || emptyInputChar;

        // Formatting
        const isCurrentDigit = index === code.length;
        const isLastDigit = index === maxLength - 1;
        const isCodeFull = code.length === maxLength;

        const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);

        const StyledCodeInput =
          inputContainerIsFocused && isDigitFocused
            ? CodeInputFocused
            : CodeInput;

        return (
          <StyledCodeInput key={index}>
            <CodeInputText>{digit}</CodeInputText>
          </StyledCodeInput>
        );
      };

      return (
        <CodeInputSection>
          <CodeInputsContainer onPress={handleOnPress}>
            {codeDigitsArray.map(toCodeDigitInput)}
          </CodeInputsContainer>
          <HiddenTextInput
            keyboardType='number-pad'
            returnKeyType='done'
            textContentType='oneTimeCode'
            ref={textInputRef}
            value={code}
            onChangeText={setCode}
            maxLength={maxLength}
            onSubmitEditing={handleOnSubmitEditing}
          />
        </CodeInputSection>
      );
    };

    export default StyledCodeInput;
    ```

- Create `/screen/EmailVerification.js`

  - ```js
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

      const [message, setMessage] = useState('');
      const [isSuccessMessage, setIsSuccessMessage] = useState(false);
      const [verifying, setVerifying] = useState(false);

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
                <ActivityIndicator
                  size='small'
                  color={primary}
                ></ActivityIndicator>
              </RegularButton>
            )}
          </KeyboardAvoidingContainer>
        </MainContainer>
      );
    };

    export default EmailVerification;
    ```

- ON `App.js`, change `Signup` to `EmailVerification`for seeing Signup page

## Resend Email Verification Code

- Create `/components/Timers/ResendTimer.js`

  - ```js
    import React, { useState, useEffect } from 'react';
    import styled from 'styled-components/native';
    import { colors } from '../colors';
    import SmallText from '../Texts/SmallText';
    import PressableText from '../Texts/PressableText';
    import RowContainer from '../Containers/RowContainer';

    const { accent, success, fail } = colors;
    const StyledView = styled.View`
      align-items: center;
    `;

    const ResendText = styled(SmallText)`
      color: ${accent};
      ${(props) => {
        const { resendStatus } = props;
        if (resendStatus == 'Failed!') {
          return `color: ${fail}`;
        } else if (resendStatus == 'Sent!') {
          return `color: ${success}`;
        }
      }}
    `;

    const ResendTimer = ({
      activeResend,
      setActiveResend,
      targetTimeInSeconds,
      resendEmail,
      resendStatus,
      ...props
    }) => {
      const [timeLeft, setTimeLeft] = useState(null);
      const [targetTime, setTargetTime] = useState(null);

      let resendTimerInterval;

      const triggerTimer = (targetTimeInSeconds = 30) => {
        setTargetTime(targetTimeInSeconds);
        setActiveResend(false);
        const finalTime = +new Date() + targetTimeInSeconds * 1000;
        resendTimerInterval = setInterval(
          () => calculateTimeLeft(finalTime),
          1000
        );
      };

      const calculateTimeLeft = (finalTime) => {
        const difference = finalTime - +new Date();
        if (difference >= 0) {
          setTimeLeft(Math.round(difference / 1000));
        } else {
          clearInterval(resendTimerInterval);
          setActiveResend(true);
          setTimeLeft(null);
        }
      };

      useEffect(() => {
        triggerTimer(targetTimeInSeconds);

        return () => {
          clearInterval(resendTimerInterval);
        };
      }, []);

      return (
        <StyledView {...props}>
          <RowContainer>
            <SmallText>Didn't receive the email? </SmallText>
            <PressableText
              onPress={() => resendEmail(triggerTimer)}
              disabled={!activeResend}
              style={{ opacity: !activeResend ? 0.65 : 1 }}
            >
              <ResendText resendStatus={resendStatus}>
                {resendStatus}
              </ResendText>
            </PressableText>
          </RowContainer>
          {!activeResend && (
            <SmallText>
              in{' '}
              <SmallText style={{ fontWeight: 'bold' }}>
                {timeLeft || targetTime}
              </SmallText>{' '}
              second(s)
            </SmallText>
          )}
        </StyledView>
      );
    };

    export default ResendTimer;
    ```

- On `/screens/EmailVerification.js`

  - ```js
    ...
    import ResendTimer from '../components/Timers/ResendTimer';

    const EmailVerification = () => {
      ...
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
    ...
      return (
        ...
            <ResendTimer
              activeResend={activeResend}
              setActiveResend={setActiveResend}
              resendStatus={resendStatus}
              resendingEmail={resendingEmail}
              resendEmail={resendEmail}
            />
          </KeyboardAvoidingContainer>
        ...
    ```

## Message Modal

- Create `/components/Modals/MessageModal.js`

  - ```js
    import React from 'react';
    import { Modal } from 'react-native';
    import styled from 'styled-components/native';
    import { colors } from '../colors';
    import { MaterialCommunityIcons } from '@expo/vector-icons';
    import BigText from '../Texts/BigText';
    import RegularText from '../Texts/RegularText';
    import RegularButton from '../Buttons/RegularButton';

    const { primary, black, tertiary, success, fail } = colors;

    const ModalPressableContainer = styled.Pressable`
      flex: 1;
      padding: 25px;
      background-color: rgba(0, 0, 0, 0.7);
      justify-content: center;
      align-items: center;
    `;

    const ModalView = styled.View`
      background-color: ${primary};
      border-radius: 20px;
      width: 100%;
      padding: 35px;
      align-items: center;
      elevation: 5;
      shadow-color: ${black};
      shadow-offset: 0px 2px;
      shadow-opacity: 0.25;
      shadow-radius: 4px;
    `;

    const MessageModal = ({
      modalVisible,
      buttonHandler,
      type,
      headerText,
      message,
      buttonText,
    }) => {
      return (
        <Modal animationType='slide' visible={modalVisible} transparent={true}>
          <ModalPressableContainer onPress={buttonHandler}>
            <ModalView>
              <MaterialCommunityIcons
                name={type === 'success' ? 'check-circle' : 'close-circle'}
                size={100}
                color={type === 'success' ? success : fail}
              />
              <BigText
                style={{ fontSize: 25, color: tertiary, marginVertical: 10 }}
              >
                {headerText}
              </BigText>
              <RegularText style={{ marginBottom: 20 }}>{message}</RegularText>
              <RegularButton onPress={buttonHandler}>
                {buttonText || 'Complete'}
              </RegularButton>
            </ModalView>
          </ModalPressableContainer>
        </Modal>
      );
    };

    export default MessageModal;
    ```

- On `/screens/EmailVerification.js`

  - ```js
    import MessageModal from '../components/Modals/MessageModal';
    ...
    const EmailVerification = () => {
      ...
      // Modal
      const [modalVisible, setModalVisible] = useState(false);
      const [modalMessageType, setModalMessageType] = useState('');
      const [headerText, setHeaderText] = useState('');
      const [modalMessage, setModalMessage] = useState();
      const [buttonText, setButtonText] = useState();

      const buttonHandler = () => {
        if (modalMessageType == 'success') {
          // do something
        }
        setModalVisible(false);
      };

      const showModal = (type, headerText, message, buttonText) => {
        setModalMessageType(type);
        setHeaderText(headerText);
        setModalMessage(message);
        setButtonText(buttonText);
        setModalVisible(true);
      };
      ...
      const handleEmailVerification = async () => {
        try {
          setVerifying(true);
          // call backend
          setVerifying(false);
          return showModal(
            'success',
            'All Good!',
            'Your email has been verified.',
            'Proceed'
          );
        } catch (error) {
          setVerifying(false);
          return showModal('failed', 'Failed!', error.message, 'Close');
        }
      };
      ...
            <MessageModal
              modalVisible={modalVisible}
              buttonHandler={buttonHandler}
              type={modalMessageType}
              headerText={headerText}
              message={modalMessage}
              buttonText={buttonText}
            />
          </KeyboardAvoidingContainer>
          ...
    ```
