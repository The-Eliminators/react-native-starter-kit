import * as React from 'react';
import { Alert } from 'react-native';

import AssetsImage from 'src/constant/AssetsImage';
import { RootStackScreenProps } from 'src/navigation/types';
import useTranslationPrefix from 'src/hooks/useTranslationPrefix';
import { useSnackbar, useActionSheet, useBottomSheet, useTheme } from 'src/hooks';
import {
  Touchable,
  Text,
  Box,
  Surface,
  Separator,
  Button,
  BottomSheet,
  ActionSheet,
  HeaderScreen,
  Avatar,
} from 'src/components';

export default function ComponentScreen({ navigation }: RootStackScreenProps<'ComponentScreen'>) {
  const { mode } = useTheme();
  const { t } = useTranslationPrefix('componentScreen');

  const { bottomSheetRef, open, close } = useBottomSheet();
  const { actionSheetRef, open: openActionSheet } = useActionSheet();
  let indexCount = 0;

  return (
    <>
      <HeaderScreen
        title={t('screenTitle')}
        subtitle={t('screenSubTitle')}
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
        {/* Header support */}
        <Box paddingBottom="m">
          <Text variant="heading">{`${++indexCount}. Custom header component`}</Text>
        </Box>

        <Separator width={2} />

        {/* Theming support */}
        <Box paddingBottom="m" pt="m">
          <Text variant="heading">{`${++indexCount}. Theming Support`}</Text>
          <Text paddingStart="m">Change the system theme to see the effect.</Text>
        </Box>

        <Separator width={2} />

        {/* Typography Demo */}
        <TypographySample index={++indexCount} />

        {/* Avatar */}
        <AvatarSample index={++indexCount} />

        {/* Surface Component*/}
        <SurfaceSample index={++indexCount} />

        {/* Touchable and Button demo */}
        <TouchableSample index={++indexCount} />

        {/* Input Field */}
        <Separator width={2} marginVertical="s" />
        <Text variant="heading">{`${++indexCount}. Input Fields`}</Text>
        <Box marginHorizontal="s">
          <Button label="Open Form Screen" onPress={() => navigation.navigate('InputFormScreen')} />
        </Box>

        {/* Bottom Sheet Example */}
        <Separator width={2} marginVertical="s" />
        <Text variant="heading">{`${++indexCount}. Bottom Sheet`}</Text>
        <Box
          flex={1}
          flexDirection="row"
          justifyContent="space-around"
          marginHorizontal="s"
          margin="xs"
          borderWidth={2}
          borderColor="onSurfaceOutline"
          borderRadius={12}>
          <Touchable onPress={() => open()} height={52} flex={1} justifyContent="center" alignItems="center">
            <Text>Open Bottom Sheet</Text>
          </Touchable>
          <Box height={52} width={2} bg="onSurfaceOutline" />
          <Touchable onPress={() => openActionSheet()} height={52} flex={1} justifyContent="center" alignItems="center">
            <Text>Open Action Sheet</Text>
          </Touchable>
        </Box>
        <Separator width={2} marginVertical="s" />

        {/* Snackbar Example */}
        <SnackBarSample index={++indexCount} />

        {/* i18n Support */}
        <I18nSample index={++indexCount} />
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

const TypographySample = ({ index }: { index: number }) => {
  return (
    <>
      <Box backgroundColor="background" pt="m">
        <Text variant="heading">{`${index}. Typography (Text Component)`}</Text>
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
    </>
  );
};

const AvatarSample = ({ index }: { index: number }) => {
  return (
    <>
      <Text variant="heading" marginVertical="s">
        {`${index}. Avatar`}
      </Text>
      <Box flexDirection={'row'} paddingBottom="s" paddingHorizontal="m">
        <Avatar source={AssetsImage.Person} label="Mosh" />
        <Avatar label="Virat Kohli" marginStart="l" />
        <Avatar label="Dhoni" backgroundColor="blue" marginStart="l" />
      </Box>
      <Separator width={2} />
    </>
  );
};

const SurfaceSample = ({ index }: { index: number }) => {
  return (
    <>
      <Box paddingVertical="m">
        <Text variant="heading" marginVertical="s" children={`${index}. Surface Component`} />
        <Surface elevation={2} padding="l" borderRadius={12} marginHorizontal="s">
          <Text variant="heading">Card Heading </Text>
          <Text pt="s">
            Surface is a basic container that can give depth to an element with elevation shadow. On dark theme, white
            overlay over a component surface. On Light Theme, container has shadow.
          </Text>
        </Surface>
      </Box>

      <Separator width={2} />
    </>
  );
};

const TouchableSample = ({ index }: { index: number }) => {
  return (
    <Box pt="s">
      <Text variant="heading">{`${index}. Touchable Components Component`}</Text>
      <Box paddingHorizontal="s">
        <Button label="Button Click me" onPress={() => console.log('clicked')} />

        <Touchable padding="l" marginVertical="s" borderRadius={8} backgroundColor="primary">
          <Text color="onPrimaryHighEmphasis" variant="subtitle">
            Touchable Component
          </Text>
          <Text pt="xs" color="onPrimaryHighEmphasis" variant="body">
            Same as TouchableOpacity but with restyle props
          </Text>
        </Touchable>
      </Box>
    </Box>
  );
};

const SnackBarSample = ({ index }: { index: number }) => {
  const showSnackbar = useSnackbar();
  return (
    <>
      <Text variant="heading">{`${index}. Snackbar`}</Text>
      <Box flex={1} mt="s" mb="m" marginHorizontal="s" borderWidth={2} borderColor="onSurfaceOutline" borderRadius={12}>
        <Box flex={1} flexDirection="row" justifyContent="space-around">
          <Touchable
            onPress={() => showSnackbar({ text: 'Show the text on Snackbar', type: 'success' })}
            height={52}
            flex={1}
            justifyContent="center"
            alignItems="center">
            <Text>Show Snackbar (default)</Text>
          </Touchable>
        </Box>
        <Separator width={2} />
        <Box flex={1} flexDirection="row" justifyContent="space-around">
          <Touchable
            onPress={() =>
              showSnackbar({
                text: 'Show the text on Snackbar',
                action: { label: 'ok', onPress: () => Alert.alert('hello') },
                duration: 'long',
                type: 'info',
              })
            }
            height={52}
            flex={1}
            justifyContent="center"
            alignItems="center">
            <Text>Action</Text>
          </Touchable>
          <Touchable
            onPress={() =>
              showSnackbar({
                text: 'Show the text on Snackbar',
                action: { label: 'Undo', onPress: () => Alert.alert('hello') },
                type: 'warning',
              })
            }
            height={52}
            flex={1}
            justifyContent="center"
            alignItems="center">
            <Text>Warning</Text>
          </Touchable>
          <Touchable
            onPress={() =>
              showSnackbar({
                text: 'Show the text on Snackbar',
                action: { label: 'Undo', onPress: () => Alert.alert('hello') },
                type: 'error',
              })
            }
            height={52}
            flex={1}
            justifyContent="center"
            alignItems="center">
            <Text>Error</Text>
          </Touchable>
        </Box>
      </Box>

      <Separator width={2} />
    </>
  );
};

const I18nSample = ({ index }: { index: number }) => {
  const { t, commonT, i18n } = useTranslationPrefix('componentScreen');
  return (
    <Box paddingVertical="m">
      <Text variant="heading">{`${index}. i18n Support`}</Text>
      <Box flex={1} flexDirection="row" justifyContent="space-around">
        <Button label="English" width="40%" onPress={() => i18n.changeLanguage('en')} />
        <Button label="Marathi" width="40%" onPress={() => i18n.changeLanguage('mr')} />
      </Box>
      <Text>{commonT('appName')}</Text>
      <Text>{t('welcomeMessage')}</Text>
      <Text variant="heading">{t('myName')}</Text>
      <Text>{t('helloWorld')}</Text>
      <Text>{t('tFunctionEg')}</Text>
    </Box>
  );
};
