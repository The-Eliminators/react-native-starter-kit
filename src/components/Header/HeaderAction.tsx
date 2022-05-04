import React from 'react';
import type { ComponentPropsWithoutRef } from 'react';

import Touchable from '../Button/Touchable';
import { ThemeColors } from 'src/types/theme.type';
import AppIcon from '../Icon/Icon';
import { IconName } from 'src/types/iconname.type';

interface Props extends ComponentPropsWithoutRef<typeof Touchable> {
  icon: IconName;
  size?: number;
  onPress?: () => void;
  color?: keyof ThemeColors;
  accessibilityLabel?: string;
}

const HeaderAction = ({ icon, size = 24, color = 'black', accessibilityLabel, ...rest }: Props) => {
  const buttonSize = size * 1.5;
  return (
    <Touchable
      justifyContent={'center'}
      alignItems={'center'}
      height={buttonSize}
      width={buttonSize}
      accessibilityLabel={accessibilityLabel}
      {...rest}>
      <AppIcon name={icon} size={size} color={color} />
    </Touchable>
  );
};

export default HeaderAction;
