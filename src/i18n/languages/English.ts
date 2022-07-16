import { ImmutableObject } from 'src/utils/typeUtility';

const English = {
  common: {
    appName: 'React Native Starter Kit',
    success: 'Success',
  },
  homeScreen: {
    title: 'Home Screen',
    subTitle: 'React native toolkit',
    action: {
      openSettings: 'Open Settings',
      openTestScreen: 'Open Test Screen',
    },
  },
  settings: {
    screenTitle: 'Settings Screen',
    action: {
      openComponentScreen: 'View Component List',
    },
  },
  componentScreen: {
    screenTitle: 'Component Screen',
    screenSubTitle: 'List of all components present in StarterKit',
    myName: 'My name is Rohit Kadam',
    tFunctionEg: 't() Example',
    welcomeMessage: 'Welcome, to our React native starter kit',
    helloWorld: 'Hello World!!!',
  },
  sendLogs: 'Send Logs',
  sendLogsMessage: 'Click here to send logs to developers',
  logMailSubject: 'Stater kit Logs',
  logMailBody: '<h1>Hii i am your logger assistant</h1><h3>Here are todays logs</h3>',
  crashPopupTitle: 'Error',
  crashPopupMessage: 'Something went wrong. Please report this issue to support team.',
  cancel: 'Cancel',
  report: 'Report',
};

export type LanguageType = typeof English;
export default English as ImmutableObject<LanguageType>;
