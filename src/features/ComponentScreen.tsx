import * as React from 'react';
import { Alert, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { useSnackbar } from 'src/hooks';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from 'src/navigation/types';
import { Touchable, Text, Box, Surface, Separator, Button, Label } from 'src/components';

export default function ComponentScreen({}: StackScreenProps<RootStackParamList, 'ComponentScreen'>) {
  const { t, i18n } = useTranslation();
  const showSnackbar = useSnackbar();

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

        <Button label="Click me" onPress={() => console.log('clicked')} />

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

        <Separator width={2} />
        <Text variant="heading">Snackbar</Text>
        <Box flex={1} flexDirection="row" flexWrap="wrap" justifyContent="space-around">
          <Button
            label="show Snackbar"
            width="40%"
            onPress={() => showSnackbar({ text: 'Show the text on Snackbar', type: 'success' })}
          />
          <Button
            label="with action"
            width="40%"
            onPress={() =>
              showSnackbar({
                text: 'Show the text on Snackbar',
                action: { label: 'ok', onPress: () => Alert.alert('hello') },
                duration: 'long',
                type: 'info',
              })
            }
          />
          <Button
            label="Warning"
            width="40%"
            onPress={() =>
              showSnackbar({
                text: 'Show the text on Snackbar',
                action: { label: 'Undo', onPress: () => Alert.alert('hello') },
                duration: 'long',
                type: 'warning',
              })
            }
          />
          <Button
            label="error"
            width="40%"
            onPress={() =>
              showSnackbar({
                text: 'Show the text on Snackbar',
                action: { label: 'Undo', onPress: () => Alert.alert('hello') },
                duration: 'long',
                type: 'error',
              })
            }
          />
        </Box>
        <Separator width={2} />

        {/* i18n Support */}
        <Box padding="m">
          <Text variant="heading">i18n Support</Text>
          <Box flex={1} flexDirection="row" justifyContent="space-around">
            <Button label="English" width="40%" onPress={() => i18n.changeLanguage('en')} />
            <Button label="Marathi" width="40%" onPress={() => i18n.changeLanguage('mr')} />
          </Box>
          <Label variant="subtitle" name="labelComponent" />
          <Label name="hiMessage" />
          <Label variant="heading" name="myNameIs" />
          <Label variant="title" name="helloWorld" />
          <Text>{t('tFunctionEg')}</Text>
        </Box>
        <Separator width={2} />
      </Box>
    </ScrollView>
  );
}
