/**
 * Place all your application configuration here.
 */
import RNFS from 'react-native-fs';

export default {
  LOGGER_FILE_NAME: 'log.txt',
  LOGGER_FILE_PATH: RNFS.DocumentDirectoryPath,
  MAIL_RECIPIENT: ['14rohitkadam@gmail.com'],
} as const;
