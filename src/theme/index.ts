import { createTheme } from '@shopify/restyle';

import spacing from './spacing';
import typography from './typography';
import { Theme } from 'src/types/theme.type';
import { darkThemeColor, lightThemeColor } from './colors';

const lightTheme = createTheme<Theme>({
  mode: 'light',
  colors: lightThemeColor,
  spacing,
  textVariants: typography,
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

const darkTheme: Theme = {
  ...lightTheme,
  mode: 'dark',
  colors: darkThemeColor,
};

export default { lightTheme, darkTheme };
