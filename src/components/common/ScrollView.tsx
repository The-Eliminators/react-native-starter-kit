import { createBox } from '@shopify/restyle';
import { ComponentPropsWithoutRef } from 'react';
import { ScrollView as NativeScrollView, ScrollViewProps } from 'react-native';

import { Theme } from 'src/types/theme.type';

const ScrollView = createBox<Theme, ScrollViewProps & { children: React.ReactNode }>(NativeScrollView);

export type TScrollView = ComponentPropsWithoutRef<typeof ScrollView>;
export default ScrollView;
