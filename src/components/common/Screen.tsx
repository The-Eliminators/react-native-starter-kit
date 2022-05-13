import React, { useEffect } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { ScrollViewProps, StatusBar } from 'react-native';

import { Box } from 'src/components';
import { useTheme } from 'src/hooks';
import ScrollView from './ScrollView';

type TScreen = {
  children: React.ReactNode;
  scrollEnabled?: boolean;
  hideStatusBar?: boolean;
  scrollViewProps?: ScrollViewProps;
  statusContentColor?: 'dark-content' | 'light-content';
} & ComponentPropsWithoutRef<typeof Box>; // All the property of Box will pass to children

const Screen = ({
  statusContentColor,
  children,
  scrollEnabled = false,
  hideStatusBar = false,
  scrollViewProps,
  ...childrenProps
}: TScreen) => {
  const { mode } = useTheme();
  const WrapperComponent = scrollEnabled ? ScrollView : Box;

  useEffect(() => {
    StatusBar.setBarStyle(statusContentColor ? statusContentColor : mode === 'dark' ? 'light-content' : 'dark-content');
  }, [statusContentColor, mode]);

  const renderWrapperComponent = () => (
    <WrapperComponent flex={1} {...childrenProps} {...scrollViewProps}>
      {children}
    </WrapperComponent>
  );

  if (hideStatusBar) {
    return renderWrapperComponent();
  }

  return (
    <Box
      flex={1}
      backgroundColor={childrenProps.backgroundColor}
      bg={childrenProps.bg}
      style={{ paddingTop: StatusBar.currentHeight }}>
      {renderWrapperComponent()}
    </Box>
  );
};

export default Screen;
