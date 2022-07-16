import React, { FC } from 'react';
import { Button, HeaderScreen, Text } from 'src/components';
import { RootStackScreenProps } from 'src/navigation/types';
import useTranslationPrefix from 'src/hooks/useTranslationPrefix';

const HomeScreen: FC<RootStackScreenProps<'HomeScreen'>> = ({ navigation }) => {
  const { t, commonT } = useTranslationPrefix('homeScreen');

  return (
    <HeaderScreen
      title={t('title')}
      subtitle={t('subTitle')}
      renderLeftHeader={null}
      paddingHorizontal="l"
      justifyContent="center"
      alignItems="center">
      <Text>{commonT('appName')}</Text>
      <Button label={t('action.openSettings')} onPress={() => navigation.navigate('SettingScreen')} />
      <Button label={t('action.openTestScreen')} onPress={() => navigation.navigate('TestScreen')} />
    </HeaderScreen>
  );
};

export default HomeScreen;
