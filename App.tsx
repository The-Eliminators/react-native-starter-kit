import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens(true);

import React from 'react';
import { ThemeProvider } from '@shopify/restyle';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar, useColorScheme } from 'react-native';

import 'src/i18n';
import theme from 'src/theme';
import Navigation from 'src/navigation';
import { SnackbarProvider } from 'src/context';

const App = () => {
  const themeMode = useColorScheme();

  // Trigger when react navigation is ready
  const onNavigationReady = () => {
    setTimeout(() => {
      // In debugging mode you will find waiting more.
      SplashScreen.hide(); // hide the splash screen after navigation ready.
    }, 2000);
  };

  return (
    <ThemeProvider theme={themeMode === 'light' ? theme.lightTheme : theme.darkTheme}>
      <StatusBar translucent={true} barStyle="default" backgroundColor="transparent" />
      <SnackbarProvider>
        <Navigation onReady={onNavigationReady} />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
