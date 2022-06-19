import { logger, fileAsyncTransport, consoleTransport } from 'react-native-logs';
import RNFS from 'react-native-fs';
import config from 'src/constant/config';

const defaultConfig = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  severity: 'debug',
  transport: (props: any) => {
    consoleTransport(props);
    fileAsyncTransport(props);
  },
  transportOptions: {
    FS: RNFS,
    fileName: config.LOGGER_FILE_NAME,
    filePath: config.LOGGER_FILE_PATH,
    colors: {
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
    },
  },
  async: true,
  dateFormat: 'local', //Choose between only time or a date: local, utc, iso
  printLevel: true, //Choose whether to print the log level
  printDate: true,
  enabled: true, //Enable or disable logging
};

var log = logger.createLogger(defaultConfig);
export default log;
