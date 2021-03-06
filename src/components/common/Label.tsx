import React from 'react';
import { createText } from '@shopify/restyle';

import { useTranslation } from 'react-i18next';
import English from 'src/i18n/languages/English';
import getFontFamily from 'src/theme/fontWeights';
import { Fonts, Theme } from 'src/theme/theme.type';

const RestyleText = createText<Theme>();

type TextProps = React.ComponentProps<typeof RestyleText> & {
  weight?: keyof Fonts;
  name: keyof typeof English;
};

/**
 * @deprecated The component should not be used. Use <Text> component insert of this component.
 */
const Label = ({ name, weight, ...props }: TextProps) => {
  const fontFamily = weight ? getFontFamily(weight) : null;
  const { t } = useTranslation();
  return (
    <RestyleText {...fontFamily} {...props}>
      {t(name)}
    </RestyleText>
  );
};

export default Label;
