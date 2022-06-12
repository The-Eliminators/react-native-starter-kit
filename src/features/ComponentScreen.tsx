import * as React from 'react';
import { Alert } from 'react-native';

import { useTranslation } from 'react-i18next';
import { RootStackScreenProps } from 'src/navigation/types';
import { useSnackbar, useActionSheet, useBottomSheet, useTheme } from 'src/hooks';
import {
  Touchable,
  Text,
  Box,
  Surface,
  Separator,
  Button,
  Label,
  BottomSheet,
  ActionSheet,
  HeaderScreen,
  Avatar,
  TextInput,
  AppIcon,
} from 'src/components';
import AssetsImage from 'src/constant/AssetsImage';

export default function ComponentScreen({}: RootStackScreenProps<'ComponentScreen'>) {
  const { mode } = useTheme();
  const { t, i18n } = useTranslation();
  const showSnackbar = useSnackbar();
  const { bottomSheetRef, open, close } = useBottomSheet();
  const { actionSheetRef, open: openActionSheet } = useActionSheet();

  return (
    <>
      <HeaderScreen
        title="Component Screen"
        subtitle="Listed all components"
        headerColor="primary"
        statusContentColor={mode === 'light' ? 'light-content' : 'dark-content'}
        titleColor="onPrimaryHighEmphasis"
        subtitleColor="onPrimaryMediumEmphasis"
        menuActions={[
          { icon: 'edit', onPress: () => Alert.alert('hi') },
          { icon: 'vertical-dots', onPress: () => Alert.alert('hi') },
        ]}
        scrollEnabled={true}
        padding="m">
        {/* Theming support */}
        <Box paddingBottom="m">
          <Text variant="heading">1. Theming Support</Text>
          <Text paddingStart="m">Change the system theme to see the effect.</Text>
        </Box>

        <Separator width={2} />

        {/* Typography Demo */}
        <Box backgroundColor="background" pt="m">
          <Text variant="heading">2. Typography (Text Component)</Text>
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

        {/* Avatar */}
        <Text variant="heading" marginVertical="s">
          3. Avatar
        </Text>
        <Box flexDirection={'row'} paddingBottom="s">
          <Avatar source={AssetsImage.Person} label="Mosh" />
          <Avatar label="Virat Kohli" marginStart="l" />
          <Avatar label="Dhoni" backgroundColor="blue" marginStart="l" />
        </Box>

        <Separator width={2} />

        {/* Surface Component*/}
        <Box paddingVertical="m">
          <Text variant="heading" marginVertical="s" children={'4. Surface Component'} />
          <Surface elevation={2} padding="l" borderRadius={12}>
            <Text variant="heading">Card Heading </Text>
            <Text pt="s">
              Surface is a basic container that can give depth to an element with elevation shadow. On dark theme, white
              overlay over a component surface. On Light Theme, container has shadow.
            </Text>
          </Surface>
        </Box>

        <Separator width={2} />

        {/* Touchable and Button demo */}
        <Box pt="s">
          <Text variant="heading">5. Touchable Components Component</Text>
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

        {/* Input Field */}
        <Separator width={2} marginVertical="s" />
        <TextInputSample />

        {/* Bottom Sheet Example */}
        <Separator width={2} marginVertical="s" />
        <Text variant="heading"> 7. Bottom Sheet</Text>
        <Box flex={1} flexDirection="row" flexWrap="wrap" justifyContent="space-around">
          <Button label="Open Botton Sheet" onPress={() => open()} />
          <Button label="Open Action Sheet" onPress={() => openActionSheet()} />
        </Box>

        {/* Snackbar Example */}
        <Separator width={2} marginVertical="s" />
        <Text variant="heading">8. Snackbar</Text>
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
        <Box paddingVertical="m">
          <Text variant="heading">9. i18n Support</Text>
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
      </HeaderScreen>
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

const TextInputSample = () => {
  return (
    <>
      <Text variant="heading"> 6. Input Fields </Text>
      <Box paddingVertical="xxxl">
        <TextInput
          leftRender={({ color }) => <AppIcon name="user" size={22} color={color} />}
          label="Name*"
          placeholder="Full Name"
          assistiveText="Required"
        />
        <Box paddingTop="l" />
        <TextInput
          leftRender={({ color }) => <AppIcon name="mail" size={22} color={color} />}
          label="Email"
          defaultValue="example@gmail.com"
        />
        <Box paddingTop="l" />
        <TextInput
          label="Password"
          secureTextEntry={true}
          leftRender={({ color }) => <AppIcon name="settings" size={22} color={color} />}
          rightRender={({ color }) => <AppIcon name="hide" size={24} color={color} />}
        />
        {/* <Box padding="m" />
      <TextInput label="Wrong" assistiveText="Assistive text" error errorMessage="Something went wrong" /> */}
        {/* <Box padding="m" />
      <TextInput
        label="Note"
        assistiveText="Write your notes"
        errorMessage="Something went wrong"
        // eslint-disable-next-line react-native/no-inline-styles
        leftRender={({ color }) => <AppIcon name="edit" size={20} color={color} style={{ flex: 1, paddingTop: 20 }} />}
        multiline
        defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
      /> */}
      </Box>
    </>
  );
};
