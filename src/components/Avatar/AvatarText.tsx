import React, { useMemo } from 'react';
import { ThemeColors } from 'src/theme/theme.type';
import utils from 'src/utils/utils';
import Box, { TBox } from '../common/Box';
import Text from '../common/Text';

export type TAvatarText = {
  label: string;
  size?: number;
  backgroundColor?: keyof ThemeColors;
  labelColor?: keyof ThemeColors;
} & TBox;

const decorateColorList: (keyof ThemeColors)[] = ['blue', 'orange', 'yellow', 'green', 'purple', 'indigo', 'red'];

const AvatarText = ({ label, size = 48, backgroundColor, bg, labelColor = 'onColor', ...rest }: TAvatarText) => {
  label = useMemo(() => {
    let text = label.trim();
    if (text.length > 2) {
      const words = text.split(/\W+/);
      if (words.length > 1) {
        text = words[0][0] + words[1][0];
      } else {
        text = words[0][0] + words[0][1];
      }
    }
    return text;
  }, [label]);

  const bgColor = useMemo<keyof ThemeColors>(() => {
    if (backgroundColor) {
      return backgroundColor;
    }
    return decorateColorList[utils.getRandomInt(decorateColorList.length)];
  }, [backgroundColor]);

  return (
    <Box
      width={size}
      height={size}
      borderRadius={size / 2}
      backgroundColor={bgColor}
      justifyContent="center"
      alignItems="center"
      {...rest}>
      <Text color={labelColor} fontSize={size / 2} lineHeight={size} numberOfLines={1}>
        {label.toUpperCase()}
      </Text>
    </Box>
  );
};

export default AvatarText;
