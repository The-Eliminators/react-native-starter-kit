import { StackScreenProps } from '@react-navigation/stack';
import React, { FC } from 'react';
import { Button, Box, Text } from 'src/components';
import { RootStackParamList } from 'src/navigation/types';

const HomeScreen: FC<StackScreenProps<RootStackParamList, 'HomeScreen'>> = ({ navigation }) => {
  return (
    <Box flex={1} justifyContent="center">
      <Text textAlign="center">Home Screen</Text>
      <Button label="Settings" onPress={() => navigation.navigate('SettingScreen')} />
    </Box>
  );
};

export default HomeScreen;
