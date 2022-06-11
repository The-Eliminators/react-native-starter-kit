import { Alert } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';

import { useBoolean } from 'src/hooks';
import { InputHandles } from 'src/components/Input/types';
import { Avatar, Box, HeaderScreen, Text, TextInput, TextInputWithSuggestion, IconButton } from 'src/components';
import DropDown from 'src/components/Input/DropDown';

const SocialMedia = [
  { id: 1, label: 'Apple' },
  { id: 2, label: 'Facebook' },
  { id: 3, label: 'Amazon' },
  { id: 4, label: 'Google' },
  { id: 5, label: 'Microsoft' },
  { id: 6, label: 'NetFlix' },
  { id: 7, label: 'HotStar' },
  { id: 8, label: 'Spotify' },
  { id: 9, label: 'Twitter' },
  { id: 10, label: 'Snapchat' },
  { id: 11, label: 'WhatsApp' },
  { id: 12, label: 'Jira' },
  { id: 13, label: 'Figma' },
  { id: 14, label: 'Github' },
  { id: 15, label: 'LinkedIn' },
  { id: 16, label: 'Instagram' },
  { id: 17, label: 'Gmail' },
  { id: 18, label: 'Skype' },
  { id: 19, label: 'Teams' },
  { id: 20, label: 'Slack' },
  { id: 21, label: 'Shopify' },
  { id: 22, label: 'Scorpion' },
];

const AddPasswordForm = () => {
  const { value: passwordVisible, toggle: togglePasswordVisibility } = useBoolean(false);
  const userNameTextInputRef = useRef<InputHandles>(null);
  const dropDownTextInputRef = useRef<InputHandles>(null);
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
        onSubmitEditing={() => dropDownTextInputRef.current?.focus()}
        blurOnSubmit={false}
        onItemSelect={() => dropDownTextInputRef.current?.focus()}
      />

      <Text paddingTop="xxl" paddingBottom="m">
        Credential Details:
      </Text>
      <TextInput
        label="Email or Username"
        ref={userNameTextInputRef}
        keyboardType="email-address"
        autoCapitalize="none"
      />
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
      <TextInput label="Website or AppName" keyboardType="email-address" />
      <Text paddingTop="xxl" paddingBottom="m">
        Other Details:
      </Text>
      <DropDown
        ref={dropDownTextInputRef}
        label="Category"
        placeholder="Choose any category"
        items={[
          { label: 'Personal', id: 1 },
          { label: 'Work', id: 2 },
          { label: 'Family', id: 3 },
          { label: 'Wife', id: 4 },
          { label: 'Friend', id: 5 },
        ]}
        onItemSelect={item => console.log('Item Selected', item)}
        assistiveText="Choose any category"
        errorMessage="Please choose category"
      />
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
      scrollViewProps={{ keyboardShouldPersistTaps: 'handled', nestedScrollEnabled: true }}>
      <AddPasswordForm />
    </HeaderScreen>
  );
};

export default TestScreen;
