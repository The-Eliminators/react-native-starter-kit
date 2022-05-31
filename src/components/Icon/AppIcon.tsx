import React from 'react';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';

// User Defined
import { useTheme } from 'src/hooks';
import { IconName } from 'src/types/iconName.type';
import { ThemeColors } from 'src/types/theme.type';
import icoMoonConfig from 'src/assets/fonts/iconConfig.json';
import { StyleProp, TextStyle } from 'react-native';

const IcoMoonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');

type IconProps = {
  name: IconName;
  size?: number;
  color?: keyof ThemeColors;
  style?: StyleProp<TextStyle>;
};

const AppIcon = ({ name, size = 24, color = 'onSurfaceMediumEmphasis', style, ...rest }: IconProps) => {
  const { colors } = useTheme();
  return (
    <IcoMoonIcon
      name={name}
      size={size}
      color={colors[color]}
      // eslint-disable-next-line react-native/no-inline-styles
      style={[{ height: size, width: size, textAlign: 'center' }, style]}
      {...rest}
    />
  );
};

export default AppIcon;
