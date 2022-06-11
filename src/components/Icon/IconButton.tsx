import React, { ComponentProps, FC } from 'react';

import AppIcon from './AppIcon';
import Touchable from '../Button/Touchable';

type TIconButton = ComponentProps<typeof AppIcon> & ComponentProps<typeof Touchable>;

const IconButton: FC<TIconButton> = ({ name, size, color, ...rest }) => (
  <Touchable {...rest}>
    <AppIcon name={name} size={size} color={color} />
  </Touchable>
);

export default IconButton;
