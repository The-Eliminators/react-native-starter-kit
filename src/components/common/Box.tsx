import { createBox } from '@shopify/restyle';
import { ComponentPropsWithoutRef } from 'react';
import { Theme } from 'src/theme/theme.type';

const Box = createBox<Theme>();

export type TBox = ComponentPropsWithoutRef<typeof Box>;

export default Box;
