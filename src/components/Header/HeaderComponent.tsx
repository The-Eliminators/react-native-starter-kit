import React, { ReactNode } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from '@shopify/restyle';

import Surface from '../common/Surface';
import overlay from 'src/utils/overlay';
import type { Theme, ThemeColors } from 'src/theme/theme.type';

interface Props {
  color?: keyof ThemeColors;
  children: ReactNode;
  statusContentColor?: 'dark-content' | 'light-content';
}

const HeaderComponent = ({ color = 'surface', children, statusContentColor }: Props) => {
  const { mode, colors } = useTheme<Theme>();

  const bgColor = mode === 'dark' && color === 'surface' ? overlay(4, colors.surface) : colors[color];

  return (
    <Surface
      elevation={4}
      height={56 + (StatusBar.currentHeight || 0)}
      alignItems="center"
      flexDirection="row"
      paddingHorizontal="m"
      style={{ backgroundColor: bgColor, paddingTop: StatusBar.currentHeight }}>
      <StatusBar
        barStyle={statusContentColor ? statusContentColor : mode === 'dark' ? 'light-content' : 'dark-content'}
      />
      {children}
    </Surface>
  );
};

export default HeaderComponent;
