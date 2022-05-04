import { useTheme as useRestyleTheme } from '@shopify/restyle';

import { Theme } from 'src/types/theme.type';

export default function useTheme() {
  const theme = useRestyleTheme<Theme>();
  return theme;
}
