import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens(true);

import React from 'react';
import { ThemeProvider } from '@shopify/restyle';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import 'src/i18n';
import theme from 'src/theme';
import Navigation from 'src/navigation';
import { SnackbarProvider } from 'src/context';

import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const themeMode = useColorScheme();

  // Check when react navigation is ready
  const onNavigationReady = () => {
    SplashScreen.hide(); // hide the splash screen after navigation ready
  };

  return (
    <ThemeProvider theme={themeMode === 'light' ? theme.lightTheme : theme.darkTheme}>
      <SafeAreaProvider>
        <SnackbarProvider>
          <Navigation onReady={onNavigationReady} />
        </SnackbarProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
