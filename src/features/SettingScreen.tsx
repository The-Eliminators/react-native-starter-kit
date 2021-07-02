import React, { FC } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Box, Label, Screen } from 'src/components';
import { RootStackParamList } from 'src/navigation/types';

const SettingScreen: FC<StackScreenProps<RootStackParamList, 'SettingScreen'>> = ({ navigation }) => {
  return (
    <Screen title="Settings Screen">
      <Box flex={1} justifyContent="center" alignItems="center">
        <Label name="settingScreen" />
        <Button label="Component Screen" onPress={() => navigation.navigate('ComponentScreen')} />
      </Box>
    </Screen>
  );
};

export default SettingScreen;
