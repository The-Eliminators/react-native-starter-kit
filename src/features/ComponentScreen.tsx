import * as React from 'react';
import { Alert, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { useTranslation } from 'react-i18next';
import { RootStackParamList } from 'src/navigation/types';
import { useSnackbar, useActionSheet, useBottomSheet } from 'src/hooks';
import { Touchable, Text, Box, Surface, Separator, Button, Label, BottomSheet, ActionSheet } from 'src/components';

export default function ComponentScreen({}: StackScreenProps<RootStackParamList, 'ComponentScreen'>) {
  const { t, i18n } = useTranslation();
  const showSnackbar = useSnackbar();
  const { bottomSheetRef, open, close } = useBottomSheet();
  const { actionSheetRef, open: openActionAheet } = useActionSheet();

  return (
    <>
      <ScrollView>
        <Box flex={1} paddingHorizontal="m">
          <Box paddingVertical="l" backgroundColor="primary" justifyContent="center" alignItems="center">
            <Text variant="subtitle" color="onPrimary">
              Hello, Here are the list custom project components.
            </Text>
          </Box>

          {/* Typography Demo */}
          <Box backgroundColor="background" pt="m">
            <Text variant="heading">Typography (Text Component)</Text>
            <Box p="xl">
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
          </Box>

          <Separator width={2} />

          {/* Touchable and Button demo */}
          <Box pt="s">
            <Text variant="heading">Touchable Components Component</Text>
            <Button label="Button Click me" onPress={() => console.log('clicked')} />

            <Touchable padding="l" margin="s" borderRadius={8} backgroundColor="primary">
              <Text color="onPrimaryHighEmphasis" variant="subtitle">
                Touchable Component
              </Text>
              <Text pt="xs" color="onPrimaryHighEmphasis" variant="body">
                Same as TouchableOpacity but with restyle props
              </Text>
            </Touchable>
          </Box>

          {/* Surface Component*/}
          <Surface elevation={2} padding="l" margin="s" borderRadius={15}>
            <Text variant="heading">Surface Component</Text>
            <Text pt="s">
              Surface is a basic container that can give depth to an element with elevation shadow. On dark theme, white
              overlay over a component surface. On Light Theme, container has shadow.
            </Text>
          </Surface>

          {/* Bottom Sheet Example */}
          <Separator width={2} marginVertical="s" />
          <Text variant="heading">Bottom Sheet</Text>
          <Box flex={1} flexDirection="row" flexWrap="wrap" justifyContent="space-around">
            <Button label="Open Botton Sheet" onPress={() => open()} />
            <Button label="Open Action Sheet" onPress={() => openActionAheet()} />
          </Box>

          {/* Snackbar Example */}
          <Separator width={2} marginVertical="s" />
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

      {/* Bottom Sheet Model */}
      <BottomSheet ref={bottomSheetRef}>
        <Box padding="m">
          <Box justifyContent="center" alignItems="center" paddingVertical="s">
            <Text variant="heading">Bottom Sheet Header</Text>
          </Box>
          <Text paddingVertical="s">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </Text>
          <Button label="close" onPress={() => close()} />
        </Box>
      </BottomSheet>

      {/* Action sheet Model */}
      <ActionSheet
        ref={actionSheetRef}
        actions={[
          { label: 'Delete', onPress: () => console.log('delete') },
          { label: 'Update', onPress: () => console.log('Update') },
          { label: 'Call to action', onPress: () => console.log('call to action') },
        ]}
      />
    </>
  );
}
