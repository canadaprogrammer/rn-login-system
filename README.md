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
