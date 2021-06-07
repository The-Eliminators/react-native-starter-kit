import { StackScreenProps } from '@react-navigation/stack';
import React, { FC } from 'react';
import { View, Text, Button } from 'react-native';
import { RootStackParamList } from 'src/navigation/types';

const SettingScreen: FC<StackScreenProps<RootStackParamList, 'SettingScreen'>> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings Screen</Text>
      <Button title="Dummy Screen" onPress={() => navigation.navigate('DummyScreen')} />
    </View>
  );
};

export default SettingScreen;
