import { createBox } from '@shopify/restyle';
import { ComponentPropsWithoutRef } from 'react';
import { Image as NativeImage, ImageProps } from 'react-native';

import { Theme } from 'src/types/theme.type';

const Image = createBox<Theme, ImageProps>(NativeImage);

export type TImage = ComponentPropsWithoutRef<typeof Image>;
export default Image;
