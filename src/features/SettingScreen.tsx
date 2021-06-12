import { StackScreenProps } from '@react-navigation/stack';
import React, { FC } from 'react';
import { Button } from 'src/components/Button';
import Box from 'src/components/common/Box';
import Text from 'src/components/common/Text';
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
