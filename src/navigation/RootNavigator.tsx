import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import type { RootStackParamList } from './types';

import HomeScreen from 'src/features/HomeScreen';
import TestScreen from 'src/features/TestScreen';
import SettingScreen from 'src/features/SettingScreen';
import ComponentScreen from 'src/features/ComponentScreen';
import InputFormScreen from 'src/features/Example/InputFormScreen';

const Stack = createStackNavigator<RootStackParamList>();
const horizontalAnimation: StackNavigationOptions = {
  gestureDirection: 'horizontal',
  headerShown: false,
  // gestureEnabled: true,
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

const RootNavigator = () => {
  return (
    <Stack.Navigator mode="modal" screenOptions={horizontalAnimation}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ComponentScreen" component={ComponentScreen} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="TestScreen" component={TestScreen} />
      <Stack.Screen name="InputFormScreen" component={InputFormScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
