import { Platform } from 'react-native';
import { Fonts } from 'src/theme/theme.type';

const robotoWeights: Fonts = {
  regular: {
    fontFamily: 'sans-serif',
    fontWeight: 'normal' as 'normal',
  },
  medium: {
    fontFamily: 'sans-serif-medium',
    fontWeight: 'normal' as 'normal',
  },
  light: {
    fontFamily: 'sans-serif-light',
    fontWeight: 'normal' as 'normal',
  },
  thin: {
    fontFamily: 'sans-serif-thin',
    fontWeight: 'normal' as 'normal',
  },
};

const sanFranciscoWeights: Fonts = {
  regular: {
    fontFamily: 'System',
    fontWeight: '400' as '400',
  },
  medium: {
    fontFamily: 'System',
    fontWeight: '500' as '500',
  },
  light: {
    fontFamily: 'System',
    fontWeight: '300' as '300',
  },
  thin: {
    fontFamily: 'System',
    fontWeight: '100' as '100',
  },
};

const getFontFamily = (weight: keyof Fonts) =>
  Platform.OS === 'android' ? robotoWeights[weight] : sanFranciscoWeights[weight];

export default getFontFamily;
