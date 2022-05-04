import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';

import { Theme } from 'src/types/theme.type';
import RootNavigator from './RootNavigator';
import getNavigationTheme from 'src/theme/getNavigationTheme';

const Navigation = ({ onReady }: { onReady?: (() => void) | undefined }) => {
  const theme = useTheme<Theme>();
  const navigationTheme = getNavigationTheme(theme);

  return (
    <NavigationContainer theme={navigationTheme} onReady={onReady}>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
