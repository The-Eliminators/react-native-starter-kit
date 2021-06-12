import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';

import Box from 'src/components/common/Box';
import Text from 'src/components/common/Text';
import { Button, Touchable } from 'src/components/Button';
import { RootStackParamList } from 'src/navigation/types';

export default function ComponentScreen({}: StackScreenProps<RootStackParamList, 'ComponentScreen'>) {
  return (
    <Box flex={1}>
      <Box flex={0.2} backgroundColor="primary" justifyContent="center" alignItems="center">
        <Text variant="subtitle" color="onPrimary">
          Hello, Here are the list custom project components.
        </Text>
      </Box>

      {/* Typography Demo */}
      <Box backgroundColor="background" p="m">
        <Text variant="headline">HeadLine</Text>
        <Text variant="title">Title</Text>
        <Text variant="heading">Heading</Text>
        <Text variant="subtitle">Subtitle</Text>
        <Text variant="body">Body</Text>
        <Text variant="caption">Caption</Text>
      </Box>
      <Button label="Click me" disabled={true} onPress={() => console.log('clicked')} />

      {/* Touchable and Button demo */}
      <Touchable padding="l" margin="s" borderRadius={8} backgroundColor="primary">
        <Text color="onPrimaryHighEmphasis" variant="subtitle">
          Touchable Component
        </Text>
        <Text pt="xs" color="onPrimaryHighEmphasis" variant="body">
          Same as TouchableOpacity but with restyle props
        </Text>
      </Touchable>
    </Box>
  );
}
