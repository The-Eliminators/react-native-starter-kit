import { Alert } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';

import { useBoolean } from 'src/hooks';
import { TextInputHandles } from 'src/components/Input/types';
import { Avatar, Box, HeaderScreen, Text, TextInput, TextInputWithSuggestion, IconButton } from 'src/components';

const SocialMedia = [
  { id: 1, title: 'Apple' },
  { id: 2, title: 'Facebook' },
  { id: 3, title: 'Amazon' },
  { id: 4, title: 'Google' },
  { id: 5, title: 'Microsoft' },
  { id: 6, title: 'NetFlix' },
  { id: 7, title: 'HotStar' },
  { id: 8, title: 'Spotify' },
  { id: 9, title: 'Twitter' },
  { id: 10, title: 'Snapchat' },
  { id: 11, title: 'WhatsApp' },
  { id: 12, title: 'Jira' },
  { id: 13, title: 'Figma' },
  { id: 14, title: 'Github' },
  { id: 15, title: 'LinkedIn' },
  { id: 16, title: 'Instagram' },
  { id: 17, title: 'Gmail' },
  { id: 18, title: 'Skype' },
  { id: 19, title: 'Teams' },
  { id: 20, title: 'Slack' },
];

const AddPasswordForm = () => {
  const { value: passwordVisible, toggle: togglePasswordVisibility } = useBoolean(false);
  const userNameTextInputRef = useRef<TextInputHandles>(null);
  const [title, setTitle] = useState('');

  const onChangeTitle = useCallback((value: string) => {
    setTitle(value);
  }, []);

  return (
    <Box paddingVertical="s">
      <TextInputWithSuggestion
        items={SocialMedia}
        leftRender={() => <Avatar label={title} size={34} borderRadius={8} />}
        label="Title*"
        placeholder="Company Name"
        assistiveText="* Required"
        onChangeText={onChangeTitle}
        autoFocus
        returnKeyType="next"
        onSubmitEditing={() => userNameTextInputRef.current?.focus()}
        blurOnSubmit={false}
        onItemSelect={() => userNameTextInputRef.current?.focus()}
      />

      <Text paddingTop="xxl" paddingBottom="m">
        Credential Details:
      </Text>
      <TextInput label="Email or Username" ref={userNameTextInputRef} />
      <Box paddingTop="l" />
      <TextInput
        label="Password"
        secureTextEntry={!passwordVisible}
        rightRender={({ color }) => (
          <IconButton
            flex={1}
            justifyContent="center"
            name={passwordVisible ? 'hide' : 'show'}
            size={24}
            paddingHorizontal="m"
            color={color}
            onPress={() => togglePasswordVisibility()}
          />
        )}
      />
      <Box paddingTop="l" />
      <TextInput label="Website or AppName" />
      <Text paddingTop="xxl" paddingBottom="m">
        Other Details:
      </Text>
      <TextInput label="Category" />
      <Box paddingTop="l" />
      <TextInput label="Note" multiline />
      <Box padding="s" />
    </Box>
  );
};

const TestScreen = () => {
  return (
    <HeaderScreen
      title="Test Screen"
      padding="m"
      menuActions={[{ icon: 'tick', onPress: () => Alert.alert('Saved') }]}
      scrollEnabled
      scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}>
      <AddPasswordForm />
    </HeaderScreen>
  );
};

export default TestScreen;
