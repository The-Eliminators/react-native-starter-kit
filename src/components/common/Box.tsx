import { createBox } from '@shopify/restyle';
import { ComponentPropsWithoutRef } from 'react';
import { Theme } from 'src/types/theme.type';

const Box = createBox<Theme>();

export type TBox = ComponentPropsWithoutRef<typeof Box>;

export default Box;
