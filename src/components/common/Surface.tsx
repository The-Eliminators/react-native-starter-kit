import { createBox, useTheme } from '@shopify/restyle';
import * as React from 'react';
import { Animated, StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { Theme } from 'src/theme/theme.type';
import overlay from 'src/utils/overlay';
import shadow from 'src/utils/shadow';

type Props = React.ComponentPropsWithRef<typeof View> & {
  children: React.ReactNode;
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
};

const BaseSurface = ({ style, ...rest }: Props) => {
  const { elevation = 4 } = (StyleSheet.flatten(style) || {}) as ViewStyle;
  const { mode, colors } = useTheme<Theme>();
  return (
    <Animated.View
      {...rest}
      style={[
        {
          backgroundColor: mode === 'dark' ? overlay(elevation, colors.surface) : colors.surface,
        },
        elevation ? shadow(elevation) : null,
        style,
      ]}
    />
  );
};

const Surface = createBox<Theme, Props>(BaseSurface);
export default Surface;
