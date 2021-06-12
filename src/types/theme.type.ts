import { BaseTheme } from '@shopify/restyle';
import Text from 'src/components/common/Text';

export type Font = {
  fontFamily: string;
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
};

export type Fonts = {
  regular: Font;
  medium: Font;
  light: Font;
  thin: Font;
};

type Text = {
  fontFamily: string;
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  fontSize: number;
  lineHeight: number;
  color: keyof ThemeColors;
};

export type Typography = {
  defaults: Text;
  headline: Text;
  title: Text;
  heading: Text;
  subtitle: Text;
  body: Text;
  caption: Text;
};

export type ThemeMode = 'light' | 'dark';

export type ThemeColors = {
  primary: string;
  primaryLight: string;
  primaryDark: string;

  secondary: string;
  secondaryDark: string;

  background: string;
  surface: string;
  error: string;

  onPrimary: string;
  onSecondary: string;
  onBackground: string;
  onSurface: string;
  onError: string;

  onSurfaceHighEmphasis: string;
  onSurfaceMediumEmphasis: string;
  onSurfaceLowEmphasis: string;
  onSurfaceDisableEmphasis: string;
  onSurfaceOutline: string;

  onPrimaryHighEmphasis: string;
  onPrimaryMediumEmphasis: string;
  onPrimaryDisableEmphasis: string;

  black: string;
  white: string;

  success: string;
  warning: string;
  info: string;

  onColor: string;
  blue: string;
  orange: string;
  yellow: string;
  green: string;
  purple: string;
  indigo: string;
  red: string;
};

export type Breakpoints = {
  phone: number;
  tablet: number;
};

export type ThemeSpacing = {
  none: number;
  xxs: number;
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
  xxl: number;
  xxxl: number;
};

export interface Theme extends BaseTheme {
  mode: ThemeMode;
  colors: ThemeColors;
  textVariants: Typography;
  breakpoints: Breakpoints;
  spacing: ThemeSpacing;
}
