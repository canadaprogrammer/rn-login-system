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
