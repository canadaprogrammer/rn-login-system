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

## Email Verification - Message Modal

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

## Forgot Password Screen

- Create `/screens/ForgotPassword.js`

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
    import IconHeader from '../components/Icons/IconHeader';

    const { primary } = colors;

    const ForgotPassword = () => {
      const [message, setMessage] = useState('');
      const [isSuccessMessage, setIsSuccessMessage] = useState(false);

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
            <IconHeader
              name='key'
              size=''
              color=''
              style={{ marginBottom: 30 }}
            />
            <RegularText style={{ marginBottom: 25 }}>
              Provide the details below to begin the process
            </RegularText>
            <Formik
              initialValues={{ email: '' }}
              onSubmit={(values, { setSubmitting }) => {
                if (values.email == '') {
                  setMessage('Please fill in all fields');
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
                  <MsgBox
                    style={{ marginBottom: 25 }}
                    success={isSuccessMessage}
                  >
                    {message || ' '}
                  </MsgBox>
                  {!isSubmitting && (
                    <RegularButton onPress={handleSubmit}>Submit</RegularButton>
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
              )}
            </Formik>
          </KeyboardAvoidingContainer>
        </MainContainer>
      );
    };

    export default ForgotPassword;
    ```

- On `App.js`, change `EmailVerification` to `ForgotPassword`

## Reset Password Screen

- Create `/screens/ResetPassword.js`

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
                if (
                  values.newPassword == '' ||
                  values.confirmNewPassword == ''
                ) {
                  setMessage('Please fill in all fields');
                  setSubmitting(false);
                } else if (values.newPassword !== values.confirmNewPassword) {
                  setMessage('Confirm password does not matched');
                  setSubmitting(false);
                } else {
                  setMessage('');
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
                  <MsgBox
                    style={{ marginBottom: 25 }}
                    success={isSuccessMessage}
                  >
                    {message || ' '}
                  </MsgBox>
                  {!isSubmitting && (
                    <RegularButton disabled={!pinReady} onPress={handleSubmit}>
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
    ```

- On `App.js`, change `ForgotPassword` to `ResetPassword`

## Reset Password - Message Modal

- On `/screens/ResetPassword.js`

  - ```js
    ...
    import MessageModal from '../components/Modals/MessageModal';
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

      const handleOnSubmit = async (credentials, setSubmitting) => {
        try {
          setMessage(null);
          // call backend

          setSubmitting(false);
          return showModal(
            'success',
            'All Good!',
            'Your password has been reset.',
            'Proceed'
          );
        } catch (error) {
          setSubmitting(false);
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
    ```

## Dashboard Screen

- Create `/components/Cards/InfoCard.js`

  - ```js
    import React from 'react';
    import styled from 'styled-components/native';
    import { ScreenHeight } from '../shared';
    import { colors } from '../colors';
    import RegularText from '../Texts/RegularText';
    import SmallText from '../Texts/SmallText';
    import { MaterialCommunityIcons } from '@expo/vector-icons';

    const { primary, secondary, black, accent } = colors;
    const CardView = styled.View`
      flex-direction: row;
      height: ${ScreenHeight * 0.2}px;
      background-color: ${primary};
      border-width: 2px;
      border-color: ${secondary};
      padding: 20px;
      border-radius: 15px;
      elevation: 5;
      shadow-color: ${black};
      shadow-offset: 0px 2px;
      shadow-opacity: 0.25;
      shadow-radius: 4px;
    `;

    const CardSection = styled.View`
      justify-content: space-between;
      align-items: flex-start;
    `;

    const InfoCard = ({ icon, title, value, date, color, ...props }) => {
      return (
        <CardView style={{ ...props?.style }}>
          <CardSection style={{ width: '60%' }}>
            <RegularText style={{ fontWeight: 'bold' }}>{title}</RegularText>
            <RegularText style={{ fontWeight: 'bold', fontSize: 25 }}>
              $ {value}
            </RegularText>
            <SmallText>{date}</SmallText>
          </CardSection>
          <CardSection style={{ width: '40%' }}>
            <MaterialCommunityIcons
              name={icon}
              size={ScreenHeight * 0.13}
              color={color ? color : accent}
            />
          </CardSection>
        </CardView>
      );
    };

    export default InfoCard;
    ```

- Create `/screens/Dashboard.js`

  - ```js
    import React from 'react';
    import MainContainer from '../components/Containers/MainContainer';
    import { colors } from '../components/colors';
    import styled from 'styled-components/native';
    import { ScreenHeight } from '../components/shared';
    import BigText from '../components/Texts/BigText';
    import InfoCard from '../components/Cards/InfoCard';

    const { darkGray, accent } = colors;

    const TopBg = styled.View`
      background-color: ${darkGray};
      width: 100%;
      height: ${ScreenHeight * 0.3}px;
      border-radius: 30px;
      position: absolute;
      top: -30px;
    `;

    const Dashboard = () => {
      return (
        <MainContainer
          style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}
        >
          <TopBg />
          <MainContainer style={{ backgroundColor: 'transparent' }}>
            <BigText style={{ marginBottom: 25, fontWeight: 'bold' }}>
              Hello, Jin!
            </BigText>
            <InfoCard
              icon='chart-timeline-variant'
              title='Balance'
              value='12,345.00'
              date='22/06/2022'
              color={darkGray}
              style={{ marginBottom: 25 }}
            />
            <InfoCard
              icon='chart-arc'
              title='Saving'
              value='2,125.00'
              date='Last 6 months'
            />
          </MainContainer>
        </MainContainer>
      );
    };

    export default Dashboard;
    ```

- On `App.js`, change `ResetPassword` to `Dashboard`

## Navigation Setup

- ```bash
  yarn add @react-navigation/native
  expo install react-native-screens react-native-safe-area-context
  yarn add @react-navigation/stack
  expo install react-native-gesture-handler
  ```

- Create `/navigators/RootStack.js`

  - ```js
    import React from 'react';
    import { NavigationContainer } from '@react-navigation/native';
    import { createStackNavigator } from '@react-navigation/stack';
    import { colors } from '../components/colors';

    // screens
    import Login from '../screens/Login';
    import Signup from '../screens/Signup';
    import EmailVerification from '../screens/EmailVerification';
    import Dashboard from '../screens/Dashboard';
    import ForgotPassword from '../screens/ForgotPassword';
    import ResetPassword from '../screens/ResetPassword';

    const { accent, secondary } = colors;
    const Stack = createStackNavigator();

    const RootStack = () => {
      return (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerTintColor: accent,
              headerTitleAlign: 'left',
              headerStyle: {
                height: 100,
                backgroundColor: secondary,
                borderBottomWidth: 0,
                shadowColor: 'transparent',
                shadowOpacity: 0,
                elevation: 0,
              },
              headerLeftContainerStyle: {
                paddingLeft: 10,
              },
              headerRightContainerStyle: {
                paddingRight: 25,
              },
            }}
            initialRouteName='EmailVerification'
          >
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Signup' component={Signup} />
            <Stack.Screen
              name='EmailVerification'
              component={EmailVerification}
              options={{ headerTitle: 'Email Verification' }}
            />
            <Stack.Screen
              name='ForgotPassword'
              component={ForgotPassword}
              options={{ headerTitle: 'Forgot Password' }}
            />
            <Stack.Screen
              name='ResetPassword'
              component={ResetPassword}
              options={{ headerTitle: 'Reset Password' }}
            />
            <Stack.Screen name='Dashboard' component={Dashboard} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    };

    export default RootStack;
    ```

- On `/components/Containers/MainContainer.js`, remove `padding-top: ${StatusBarHeight + 30}px;`

- On `App.js`, change `Dashboard` to `RootStack`

## Dashboard Screen - Profile Section

- On `/components/Modals/MessageModal.js`, export styled components

- Create `/components/Modals/ProfileModal.js`

  - ```js
    import React from 'react';
    import { Modal, ActivityIndicator } from 'react-native';
    import styled from 'styled-components/native';
    import { colors } from '../colors';
    import { MaterialCommunityIcons } from '@expo/vector-icons';
    import BigText from '../Texts/BigText';
    import RegularButton from '../Buttons/RegularButton';
    import { ModalPressableContainer, ModalView } from './MessageModal';

    const { primary, tertiary, accent, secondary } = colors;

    const StyledView = styled.View`
      background-color: ${primary};
      flex-direction: column;
      height: 65px;
      width: 65px;
      border-radius: 15px;
      justify-content: center;
      align-items: center;
      border-width: 2px;
      border-color: ${secondary};
    `;

    const ProfileModal = ({
      modalVisible,
      buttonHandler,
      headerText,
      loggingOut,
      hideModal,
    }) => {
      return (
        <Modal animationType='slide' visible={modalVisible} transparent={true}>
          <ModalPressableContainer onPress={hideModal}>
            <ModalView>
              <StyledView>
                <MaterialCommunityIcons
                  name='account'
                  size={55}
                  color={accent}
                />
              </StyledView>

              <BigText
                style={{ fontSize: 25, color: tertiary, marginVertical: 20 }}
              >
                {headerText}
              </BigText>
              {!loggingOut && (
                <RegularButton onPress={buttonHandler}>Logout</RegularButton>
              )}
              {loggingOut && (
                <RegularButton disabled={true}>
                  <ActivityIndicator size='small' color={primary} />
                </RegularButton>
              )}
            </ModalView>
          </ModalPressableContainer>
        </Modal>
      );
    };

    export default ProfileModal;
    ```

- Create `/components/Buttons/Avatar.js`

  - ```js
    import React, { useState } from 'react';
    import styled from 'styled-components/native';
    import { colors } from '../colors';
    import { MaterialCommunityIcons } from '@expo/vector-icons';
    import ProfileModal from '../Modals/ProfileModal';

    const { primary, secondary, accent } = colors;
    const StyledView = styled.TouchableOpacity`
      background-color: ${primary};
      flex-direction: column;
      height: 45px;
      width: 45px;
      border-radius: 15px;
      justify-content: center;
      align-items: center;
      border-width: 2px;
      border-color: ${secondary};
    `;

    const Avatar = (props) => {
      // Modal
      const [modalVisible, setModalVisible] = useState(false);
      const [headerText, setHeaderText] = useState('');
      const [loggingOut, setLoggingOut] = useState(false);

      const onLogout = async () => {
        setLoggingOut(true);

        // clear user credentials

        setLoggingOut(false);
        setModalVisible(false);

        // move to login
      };

      const showProfileModal = (user) => {
        setHeaderText(user);
        setModalVisible(true);
      };

      const hideModal = () => {
        setModalVisible(false);
      };

      const onAvatarPress = () => {
        showProfileModal('Jin Park');
      };
      return (
        <>
          <StyledView onPress={onAvatarPress} style={props.imgContainerStyle}>
            <MaterialCommunityIcons name='account' size={35} color={accent} />
          </StyledView>
          <ProfileModal
            modalVisible={modalVisible}
            headerText={headerText}
            buttonHandler={onLogout}
            loggingOut={loggingOut}
            hideModal={hideModal}
          />
        </>
      );
    };

    export default Avatar;
    ```

- On `/navigators/RootStack.js`

  - ```js
    ...
    import Avatar from '../components/Buttons/Avatar';

    const { accent, secondary, darkGray } = colors;
    ...
            initialRouteName='Dashboard'
          >
          ...
            <Stack.Screen
              name='Dashboard'
              component={Dashboard}
              options={{
                headerStyle: {
                  height: 100,
                  backgroundColor: darkGray,
                  borderBottomWidth: 0,
                  shadowColor: 'transparent',
                  shadowOpacity: 0,
                  elevation: 0,
                },
                headerRight: () => <Avatar />,
              }}
            />
          </Stack.Navigator>
          ...
    ```
