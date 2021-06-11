import { StackScreenProps } from '@react-navigation/stack';
import React, { FC } from 'react';
import { View, Text, Button } from 'react-native';
import { RootStackParamList } from 'src/navigation/types';

const HomeScreen: FC<StackScreenProps<RootStackParamList, 'HomeScreen'>> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Settings" onPress={() => navigation.navigate('SettingScreen')} />
    </View>
  );
};

export default HomeScreen;
