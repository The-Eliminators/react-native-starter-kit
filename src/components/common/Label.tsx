import React from 'react';
import { createText } from '@shopify/restyle';
import getFontFamily from 'src/theme/fontWeights';
import { Fonts, Theme } from 'src/types/theme.type';
import { useTranslation } from 'react-i18next';
import English from 'src/i18n/languages/English';

const RestyleText = createText<Theme>();

type TextProps = React.ComponentProps<typeof RestyleText> & {
  weight?: keyof Fonts;
  name: keyof typeof English;
};

const Label = ({ name, weight, ...props }: TextProps) => {
  const fontFmaily = weight ? getFontFamily(weight) : null;
  const { t } = useTranslation();
  return (
    <RestyleText {...fontFmaily} {...props}>
      {t(name)}
    </RestyleText>
  );
};

export default Label;
