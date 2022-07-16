import { Text } from 'react-native';
import React, { FC, useState } from 'react';

import log from 'src/utils/logger';
import { Button, HeaderScreen } from 'src/components';
import { RootStackScreenProps } from 'src/navigation/types';
import useTranslationPrefix from 'src/hooks/useTranslationPrefix';

const SettingScreen: FC<RootStackScreenProps<'SettingScreen'>> = ({ navigation }) => {
  log.info('Hello World');

  const [count, setCount] = useState(0);
  const { t } = useTranslationPrefix('settings');

  const renderError = () => {
    if (count === 5) {
      throw new Error('Count is reached beyond limit');
    }

    return <Text>Count : {count}</Text>;
  };

  return (
    <HeaderScreen title={t('screenTitle')} justifyContent="center" alignItems="center" paddingHorizontal="l">
      <Button label={t('action.openComponentScreen')} onPress={() => navigation.navigate('ComponentScreen')} />
      <Button label="Click here till below count goes to 5" onPress={() => setCount(count + 1)} />
      {renderError()}
    </HeaderScreen>
  );
};

export default SettingScreen;
