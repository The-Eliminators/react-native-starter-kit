import React from 'react';
import { BoxProps } from '@shopify/restyle';

import { Box, Text } from 'src/components';
import { Theme, ThemeColors } from 'src/types/theme.type';

interface Props extends BoxProps<Theme> {
  title: string;
  subtitle?: string;
  titleColor?: keyof ThemeColors;
  subtitleColor?: keyof ThemeColors;
}

const HeaderContent = ({ title, subtitle, titleColor, subtitleColor, ...rest }: Props) => {
  return (
    <Box flex={1} ps="l" {...rest}>
      <Text numberOfLines={1} variant="title" color={titleColor}>
        {title}
      </Text>
      {subtitle && (
        <Text numberOfLines={1} variant="caption" color={subtitleColor}>
          {subtitle}
        </Text>
      )}
    </Box>
  );
};

export default HeaderContent;
