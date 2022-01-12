/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './views/screens/SplashScreen.js';
import InputScreen from './views/screens/InputScreen.js';
import ProfileScreen from './views/screens/ProfileScreen.js';
import RepositoryScreen from './views/screens/RepositoryScreen.js';
import FollowingScreen from './views/screens/FollowingScreen.js';
import FollowersScreen from './views/screens/FollowersScreen.js';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerMode: 'none'}}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Input"
          component={InputScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Repository"
          component={RepositoryScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Followers"
          component={FollowersScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Following"
          component={FollowingScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
