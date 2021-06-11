import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import Box from 'src/components/common/Box';
import Text from 'src/components/common/Text';
import { RootStackParamList } from 'src/navigation/types';

export default function ComponentScreen({}: StackScreenProps<RootStackParamList, 'ComponentScreen'>) {
  return (
    <Box flex={1}>
      <Box flex={0.2} backgroundColor="primary" justifyContent="center" alignItems="center">
        <Text variant="subtitle" color="onPrimary">
          Hello, This is inside Restyle text component
        </Text>
      </Box>
      <Box backgroundColor="background" p="m">
        <Text variant="headline">HeadLine</Text>
        <Text variant="title">Title</Text>
        <Text variant="heading">Heading</Text>
        <Text variant="subtitle">Subtitle</Text>
        <Text variant="body">Body</Text>
        <Text variant="caption">Caption</Text>
      </Box>
    </Box>
  );
}
