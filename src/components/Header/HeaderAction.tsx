import React from 'react';
import type { ComponentPropsWithoutRef } from 'react';

import Touchable from '../Button/Touchable';
import { ThemeColors } from 'src/types/theme.type';

interface Props extends ComponentPropsWithoutRef<typeof Touchable> {
  icon?: string;
  size?: number;
  onPress?: () => void;
  color?: keyof ThemeColors;
  accessibilityLabel?: string;
}

const HeaderAction = ({ icon, size = 24, color = 'onSurfaceDisableEmphasis', accessibilityLabel, ...rest }: Props) => {
  const buttonSize = size * 1.5;
  return (
    <Touchable height={buttonSize} width={buttonSize} accessibilityLabel={accessibilityLabel} bg={color} {...rest} />
  );
};

export default HeaderAction;
