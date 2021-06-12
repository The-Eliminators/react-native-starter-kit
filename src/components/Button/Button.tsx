import React from 'react';
import { ColorProps } from '@shopify/restyle';
import { Theme } from 'src/types/theme.type';
import Text from '../common/Text';
import { Touchable } from '.';

type Props = React.ComponentProps<typeof Touchable> &
  ColorProps<Theme> & {
    onPress: () => void;
    label: string;
  };

const Button = ({ label, color = 'onPrimary', ...props }: Props) => {
  return (
    <Touchable
      width="100%"
      padding="s"
      marginVertical="s"
      alignItems="center"
      backgroundColor="primary"
      borderRadius={25}
      opacity={1}
      {...props}>
      <Text p="xxs" variant="subtitle" color={color}>
        {label}
      </Text>
    </Touchable>
  );
};

export default Button;
