import React, { FC } from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { Button, Label, Screen } from 'src/components';
import { RootStackParamList } from 'src/navigation/types';

const SettingScreen: FC<StackScreenProps<RootStackParamList, 'SettingScreen'>> = ({ navigation }) => {
  return (
    <Screen title="Settings Screen" justifyContent="center" alignItems="center" paddingHorizontal="l">
      <Label name="settingScreen" />
      <Button label="Component Screen" onPress={() => navigation.navigate('ComponentScreen')} />
    </Screen>
  );
};

export default SettingScreen;
