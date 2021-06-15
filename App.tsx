import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens(true);

import React from 'react';
import { ThemeProvider } from '@shopify/restyle';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import 'src/i18n';
import theme from 'src/theme';
import Navigation from 'src/navigation';

const App = () => {
  const themeMode = useColorScheme();
  return (
    <ThemeProvider theme={themeMode === 'light' ? theme.lightTheme : theme.darkTheme}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Navigation />
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
