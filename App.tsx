import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens(true);

import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from '@shopify/restyle';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import theme from 'src/theme';
import Navigation from 'src/navigation';

const App = () => {
  return (
    <ThemeProvider theme={theme.lightTheme}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Navigation />
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
