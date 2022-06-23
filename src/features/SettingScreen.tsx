import React, { FC, useState } from 'react';

import { Button, Label, HeaderScreen } from 'src/components';
import { RootStackScreenProps } from 'src/navigation/types';

import log from 'src/utils/logger';
import { Text } from 'react-native';

const SettingScreen: FC<RootStackScreenProps<'SettingScreen'>> = ({ navigation }) => {
  log.info('Hello World');

  const [count, setCount] = useState(0);

  const renderError = () => {
    if (count === 5) {
      throw new Error('Count is reached beyoud limit');
    }

    return <Text>Count : {count}</Text>;
  };

  return (
    <HeaderScreen title="Settings Screen" justifyContent="center" alignItems="center" paddingHorizontal="l">
      <Label name="settingScreen" />
      <Button label="Component Screen" onPress={() => navigation.navigate('ComponentScreen')} />
      <Button label="Input Form Screen" onPress={() => navigation.navigate('InputFormScreen')} />
      <Button label="Click here till below count goes to 5" onPress={() => setCount(count + 1)} />
      {renderError()}
    </HeaderScreen>
  );
};

export default SettingScreen;
