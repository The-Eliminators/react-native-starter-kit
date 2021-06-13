import React, { FC } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Box, Text } from 'src/components';
import { RootStackParamList } from 'src/navigation/types';

const SettingScreen: FC<StackScreenProps<RootStackParamList, 'SettingScreen'>> = ({ navigation }) => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text>Settings Screen</Text>
      <Button label="Component Screen" onPress={() => navigation.navigate('ComponentScreen')} />
    </Box>
  );
};

export default SettingScreen;
