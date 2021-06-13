import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';

import Box from 'src/components/common/Box';
import Text from 'src/components/common/Text';
import { Button, Touchable } from 'src/components/Button';
import { RootStackParamList } from 'src/navigation/types';
import Surface from 'src/components/common/Surface';
import Separator from 'src/components/common/Separator';
import { ScrollView } from 'react-native';

export default function ComponentScreen({}: StackScreenProps<RootStackParamList, 'ComponentScreen'>) {
  return (
    <ScrollView>
      <Box flex={1}>
        <Box paddingVertical="l" backgroundColor="primary" justifyContent="center" alignItems="center">
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
          <Text variant="subtitle" weight="medium">
            Subtitle bold
          </Text>
        </Box>

        <Separator width={5} />

        {/* Touchable and Button demo */}

        <Button label="Click me" disabled={true} onPress={() => console.log('clicked')} />

        <Touchable padding="l" margin="s" borderRadius={8} backgroundColor="primary">
          <Text color="onPrimaryHighEmphasis" variant="subtitle">
            Touchable Component
          </Text>
          <Text pt="xs" color="onPrimaryHighEmphasis" variant="body">
            Same as TouchableOpacity but with restyle props
          </Text>
        </Touchable>

        {/* Surface Component*/}
        <Surface elevation={4} padding="l" margin="s" borderRadius={15}>
          <Text variant="heading">Surface Component</Text>
          <Text pt="s">
            Surface is a basic container that can give depth to an element with elevation shadow. On dark theme, white
            overlay over a component surface. On Light Theme, container has shadow.
          </Text>
        </Surface>
      </Box>
    </ScrollView>
  );
}
