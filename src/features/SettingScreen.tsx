import React, { FC } from 'react';

import { Button, Label, HeaderScreen } from 'src/components';
import { RootStackScreenProps } from 'src/navigation/types';

import log from 'src/utils/logger';
import config from 'src/constant/config';
import MailSender from 'src/utils/mailSender';

const SettingScreen: FC<RootStackScreenProps<'SettingScreen'>> = ({ navigation }) => {
  log.info('Hello World');
  return (
    <HeaderScreen title="Settings Screen" justifyContent="center" alignItems="center" paddingHorizontal="l">
      <Label name="settingScreen" />
      <Label name="sendLogsMessage" />
      <Button
        label="Send Logs"
        onPress={() =>
          MailSender({
            subject: 'Stater kit Logs',
            to: ['14rohitkadam@gmail.com'],
            body: '<h1>Hii i am your logger assistant</h1><h3>Here are todays logs</h3>',
            attachments: [{ path: `${config.LOGGER_FILE_PATH}/${config.LOGGER_FILE_NAME}`, type: 'txt' }],
          })
        }
      />
      <Button label="Component Screen" onPress={() => navigation.navigate('ComponentScreen')} />
      <Button label="Input Form Screen" onPress={() => navigation.navigate('InputFormScreen')} />
    </HeaderScreen>
  );
};

export default SettingScreen;
