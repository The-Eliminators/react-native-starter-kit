import React from 'react';
import type { ComponentPropsWithoutRef } from 'react';

import AppIcon from '../Icon/AppIcon';
import Touchable from '../Button/Touchable';
import { ThemeColors } from 'src/theme/theme.type';
import { IconName } from 'src/components/Icon/iconName.type';

export type THeaderAction = ComponentPropsWithoutRef<typeof Touchable> & {
  icon: IconName;
  size?: number;
  onPress?: () => void;
  color?: keyof ThemeColors;
  accessibilityLabel?: string;
};

const HeaderAction = ({ icon, size = 18, color = 'onSurface', accessibilityLabel, ...rest }: THeaderAction) => {
  const buttonSize = size * 2;
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
