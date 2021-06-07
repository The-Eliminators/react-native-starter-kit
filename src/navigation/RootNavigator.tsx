import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import HomeScreen from 'src/screens/HomeScreen';
import DummyScreen from 'src/screens/DummyScreen';
import SettingScreen from 'src/screens/SettingScreen';

const Stack = createStackNavigator<RootStackParamList>();
const horizontalAnimation: StackNavigationOptions = {
  gestureDirection: 'horizontal',
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
      <Stack.Screen name="HomeScreen" options={{ title: 'Home Screen' }} component={HomeScreen} />
      <Stack.Screen name="DummyScreen" options={{ title: 'Dummy Screen' }} component={DummyScreen} />
      <Stack.Screen name="SettingScreen" options={{ title: 'Settings Screen' }} component={SettingScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
