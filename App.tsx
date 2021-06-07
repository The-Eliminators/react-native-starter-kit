import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens(true);

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

import Navigation from 'src/navigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Navigation />
    </SafeAreaProvider>
  );
};

export default App;
