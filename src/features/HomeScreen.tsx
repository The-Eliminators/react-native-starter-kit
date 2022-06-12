import React, { FC } from 'react';

import { Button, HeaderScreen, Label } from 'src/components';
import { RootStackScreenProps } from 'src/navigation/types';

const HomeScreen: FC<RootStackScreenProps<'HomeScreen'>> = ({ navigation }) => {
  return (
    <HeaderScreen
      title="Home Screen"
      subtitle="React native toolkit"
      renderLeftHeader={null}
      paddingHorizontal="l"
      justifyContent="center"
      alignItems="center">
      <Label textAlign="center" name="home" />
      <Button label="Settings" onPress={() => navigation.navigate('SettingScreen')} />
      <Button label="Test Screen" onPress={() => navigation.navigate('TestScreen')} />
    </HeaderScreen>
  );
};

export default HomeScreen;
