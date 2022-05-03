import React from 'react';
import { useTheme } from '@shopify/restyle';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';

// User Defined
import icomoonConfig from 'src/assets/fonts/iconConfig.json';
import { IconName } from 'src/types/iconname.type';
import { Theme, ThemeColors } from 'src/types/theme.type';

const IcoMoonIcon = createIconSetFromIcoMoon(icomoonConfig, 'icomoon', 'icomoon.ttf');

type IconProps = {
  name: IconName;
  size?: number;
  color?: keyof ThemeColors;
};

const AppIcon = ({ name, size = 24, color = 'primary', ...rest }: IconProps) => {
  const { colors } = useTheme<Theme>();
  return <IcoMoonIcon name={name} size={size} color={colors[color]} {...rest} />;
};

export default AppIcon;
