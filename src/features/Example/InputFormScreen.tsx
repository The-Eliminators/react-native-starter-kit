import { Keyboard } from 'react-native';
import React, { FC, useCallback, useRef, useState } from 'react';

import { useBoolean, useBottomSheet } from 'src/hooks';
import { InputHandles } from 'src/components/Input/types';
import {
  Avatar,
  Box,
  HeaderScreen,
  Text,
  TextInput,
  TextInputWithSuggestion,
  IconButton,
  BottomSheet,
  Button,
} from 'src/components';
import DropDown from 'src/components/Input/DropDown';
import { RootStackScreenProps } from 'src/navigation/types';

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

const useTextInput = ({ value: defaultValue }: { value?: string } = {}) => {
  const [value, setValue] = useState(defaultValue || '');
  const ref = useRef<InputHandles>(null);

  const onChange = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  return {
    value,
    setValue: onChange,
    ref,
  };
};

const InputFormScreen: FC<RootStackScreenProps<'InputFormScreen'>> = ({ navigation }) => {
  const { value: passwordVisible, toggle: togglePasswordVisibility } = useBoolean(false);
  const { value: title, setValue: onChangeTitle } = useTextInput();
  const { value: account, setValue: setAccount, ref: accountRef } = useTextInput();
  const { value: password, setValue: setPassword, ref: passwordRef } = useTextInput();
  const { value: appUri, setValue: setAppUri, ref: appUriRef } = useTextInput();
  const { value: note, setValue: setNote, ref: noteRef } = useTextInput();
  const { bottomSheetRef, open, close } = useBottomSheet();
  const categoryRef = useRef<InputHandles>(null);
  const [category, setCategory] = useState<{
    id: number;
    label: string;
  }>();

  return (
    <>
      <HeaderScreen
        title="Add Password"
        padding="m"
        menuActions={[
          {
            icon: 'tick',
            onPress: () => {
              Keyboard.dismiss();
              open();
            },
          },
        ]}
        scrollEnabled
        scrollViewProps={{ keyboardShouldPersistTaps: 'handled', nestedScrollEnabled: true }}>
        <Box paddingVertical="s">
          <TextInputWithSuggestion
            value={title}
            items={SocialMedia}
            leftRender={() => <Avatar label={title} size={34} borderRadius={8} />}
            label="Title*"
            placeholder="Company Name"
            assistiveText="* Required"
            onChangeText={onChangeTitle}
            autoFocus
            returnKeyType="next"
            onSubmitEditing={accountRef.current?.focus}
            blurOnSubmit={false}
            onItemSelect={accountRef.current?.focus}
          />

          <Text paddingTop="xxl" paddingBottom="m">
            Credential Details:
          </Text>
          <TextInput
            ref={accountRef}
            label="Email or Username"
            value={account}
            onChangeText={setAccount}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={passwordRef.current?.focus}
          />
          <Box paddingTop="l" />
          <TextInput
            label="Password"
            value={password}
            ref={passwordRef}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={appUriRef.current?.focus}
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
          <TextInput
            value={appUri}
            onChangeText={setAppUri}
            ref={appUriRef}
            label="Website or AppName"
            keyboardType="email-address"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={categoryRef.current?.focus}
          />
          <Text paddingTop="xxl" paddingBottom="m">
            Other Details:
          </Text>
          <DropDown
            value={category}
            ref={categoryRef}
            label="Category"
            placeholder="Choose any category"
            items={[
              { label: 'Personal', id: 1 },
              { label: 'Work', id: 2 },
              { label: 'Family', id: 3 },
              { label: 'Wife', id: 4 },
              { label: 'Friend', id: 5 },
            ]}
            onItemSelect={setCategory}
            assistiveText="Choose any category"
            errorMessage="Please choose category"
            onBlur={noteRef.current?.focus}
          />
          <Box paddingTop="l" />
          <TextInput ref={noteRef} value={note} onChangeText={setNote} label="Note" multiline />
          <Box padding="s" />
        </Box>
      </HeaderScreen>
      {/* Bottom Sheet Model */}
      <BottomSheet ref={bottomSheetRef}>
        <Box padding="m">
          <Text variant="heading" paddingVertical="s">
            Password Detail
          </Text>
          <Box paddingHorizontal="m">
            {[
              { label: 'Title', value: title },
              { label: 'Username', value: account },
              { label: 'Password', value: password },
              { label: 'Website', value: appUri },
              { label: 'category', value: category?.label },
              { label: 'Note', value: note },
            ].map(({ label, value }, index) => (
              <Box flexDirection="row" alignItems="baseline" key={`Row-${index}`}>
                <Text variant="subtitle">{`${label}: `}</Text>
                <Text>{value || 'Not Set'}</Text>
              </Box>
            ))}
          </Box>
          <Button
            label="Save"
            onPress={() => {
              close();
              navigation.goBack();
            }}
          />
        </Box>
      </BottomSheet>
    </>
  );
};

export default InputFormScreen;
