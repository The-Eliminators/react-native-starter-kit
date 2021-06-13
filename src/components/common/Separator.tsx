import {
  ColorProps,
  OpacityProps,
  SpacingProps,
  useRestyle,
  spacing,
  opacity,
  backgroundColor,
  layout,
} from '@shopify/restyle';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Theme } from 'src/types/theme.type';

interface Props extends ColorProps<Theme>, OpacityProps<Theme>, SpacingProps<Theme> {
  width?: number;
}

const restyleFunctions = [spacing, opacity, backgroundColor, layout];

const Separator = ({ color = 'onSurfaceOutline', width = StyleSheet.hairlineWidth, ...rest }: Props) => {
  const param = { ...rest, backgroundColor: color, height: width };
  const props = useRestyle(restyleFunctions, param);
  console.log(props);
  return <View {...props} />;
};

export default Separator;
