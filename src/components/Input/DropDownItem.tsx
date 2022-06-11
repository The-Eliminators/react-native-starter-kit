import React from 'react';

import Text from '../common/Text';
import AppIcon from '../Icon/AppIcon';
import Box, { TBox } from '../common/Box';
import { ThemeColors } from 'src/theme/theme.type';

type DropDownItemProps = {
  label: string;
  selected?: boolean;
  color?: keyof ThemeColors;
} & TBox;

const DropDownItem = ({ label, selected, color, ...rest }: DropDownItemProps) => (
  <Box height={42} paddingStart="l" paddingEnd="xxl" alignItems="center" flexDirection="row" {...rest}>
    <Box flex={1}>
      <Text color={color}>{label}</Text>
    </Box>
    {selected && <AppIcon name="tick" size={16} />}
  </Box>
);

export default DropDownItem;
