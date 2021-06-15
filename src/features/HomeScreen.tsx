import { StackScreenProps } from '@react-navigation/stack';
import React, { FC } from 'react';
import { Button, Box, Label } from 'src/components';
import { RootStackParamList } from 'src/navigation/types';

const HomeScreen: FC<StackScreenProps<RootStackParamList, 'HomeScreen'>> = ({ navigation }) => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Label textAlign="center" name="home" />
      <Button label="Settings" onPress={() => navigation.navigate('SettingScreen')} />
    </Box>
  );
};

export default HomeScreen;
