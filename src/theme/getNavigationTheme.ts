import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Theme } from 'src/types/theme.type';
import overlay from 'src/utils/overlay';

const getNavigationTheme = ({ mode, colors }: Theme) => {
  let navigationTheme;
  let navigationColors;

  if (mode === 'light') {
    navigationTheme = DefaultTheme;
    navigationColors = DefaultTheme.colors;
  } else {
    navigationTheme = DarkTheme;
    navigationColors = DarkTheme.colors;
  }

  const newNavigationTheme = {
    ...navigationTheme,
    colors: {
      ...navigationColors,
      primary: colors.primary,
      background: colors.background,
      card: mode === 'dark' ? overlay(4, colors.surface) : colors.surface,
      text: colors.onSurfaceHighEmphasis,
    },
  };
  return newNavigationTheme;
};

export default getNavigationTheme;
