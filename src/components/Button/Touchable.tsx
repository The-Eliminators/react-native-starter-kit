import { createBox } from '@shopify/restyle';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Theme } from 'src/types/theme.type';

const Touchable = createBox<Theme, TouchableOpacityProps & { children?: React.ReactNode }>(TouchableOpacity);

export default Touchable;
