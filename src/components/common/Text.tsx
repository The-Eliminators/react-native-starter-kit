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
  const fontFmaily = weight ? getFontFamily(weight) : null;
  return (
    <RestyleText {...fontFmaily} {...props}>
      {children}
    </RestyleText>
  );
};

export default Text;
