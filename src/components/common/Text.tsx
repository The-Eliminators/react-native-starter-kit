import React from 'react';
import { createText } from '@shopify/restyle';
import getFontFamily from 'src/theme/fontWeights';
import { Fonts, Theme } from 'src/types/theme.type';

const RestyleText = createText<Theme>();

type TextProps = React.ComponentProps<typeof RestyleText> & {
  weight?: keyof Fonts;
  children: string;
};

const Text = ({ children, weight, ...props }: TextProps) => {
  const fontFamily = weight ? getFontFamily(weight) : null;
  return (
    <RestyleText {...fontFamily} {...props}>
      {children}
    </RestyleText>
  );
};

export default Text;
