import { LanguageType } from './English';

const Marathi: Partial<LanguageType> = {
  common: {
    appName: 'रिअॅक्ट नेटिव्ह स्टार्टर किट',
    success: 'यश',
  },
  homeScreen: {
    title: 'होम स्क्रीन',
    subTitle: 'रिअॅक्ट नेटिव्ह टूलकिटवर',
    action: {
      openSettings: 'सेटिंग्ज',
      openTestScreen: 'चाचणी स्क्रीन',
    },
  },
  settings: {
    screenTitle: 'सेटिंग्ज स्क्रीन',
    action: {
      openComponentScreen: 'घटक सूची पहा',
    },
  },
  componentScreen: {
    screenTitle: 'घटक स्क्रीन',
    screenSubTitle: 'स्टार्टर किटमध्ये उपस्थित असलेल्या सर्व घटकांची यादी',
    myName: 'माझे नाव रोहित कदम आहे',
    welcomeMessage: 'स्वागत आहे, आमच्या रिएक्ट नेटिव्ह स्टार्टर किटमध्ये',
    helloWorld: 'हॅलो वर्ल्ड !!!',
    tFunctionEg: 't() उदाहरण',
  },
  logMailSubject: 'स्टार्टर किट लॉग',
  logMailBody: '<h1>हाय मी तुमचा लॉगर असिस्टंट आहे</h1><h3>हे आजचे लॉग आहेत</h3>',
  crashPopupTitle: 'त्रुटी',
  crashPopupMessage: 'काहीतरी चूक झाली. कृपया समर्थन कार्यसंघाकडे या समस्येचा अहवाल द्या.',
  cancel: 'रद्द करा',
  report: 'अहवाल द्या',
} as const;

export default Marathi;
