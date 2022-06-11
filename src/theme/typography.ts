import { Typography } from 'src/theme/theme.type';
import getFontFamily from './fontWeights';

const typography: Typography = {
  defaults: {
    // Copy of Body
    ...getFontFamily('regular'),
    fontSize: 14,
    lineHeight: 20,
    color: 'onSurfaceMediumEmphasis',
  },
  headline: {
    ...getFontFamily('regular'),
    fontSize: 24,
    lineHeight: 24,
    color: 'onSurfaceHighEmphasis',
  },
  title: {
    ...getFontFamily('medium'),
    fontSize: 20,
    lineHeight: 24,
    color: 'onSurfaceHighEmphasis',
  },
  heading: {
    ...getFontFamily('regular'),
    fontSize: 18,
    lineHeight: 24,
    color: 'onSurfaceHighEmphasis',
  },
  subtitle: {
    ...getFontFamily('regular'),
    fontSize: 16,
    lineHeight: 24,
    color: 'onSurfaceMediumEmphasis',
  },
  body: {
    ...getFontFamily('regular'),
    fontSize: 14,
    lineHeight: 20,
    color: 'onSurfaceMediumEmphasis',
  },
  caption: {
    ...getFontFamily('regular'),
    fontSize: 12,
    lineHeight: 16,
    color: 'onSurfaceMediumEmphasis',
  },
};

export default typography;
