import { Alert } from 'react-native';
import Mailer from 'react-native-mail';

type MailSenderProps = {
  to: string[];
  subject?: string;
  body?: string;
  onError?: Function;
  attachments?: {
    path: string;
    type: string;
    name?: string;
  }[];
};

const MailSender = ({ subject, to, body, attachments }: MailSenderProps) => {
  Mailer.mail(
    {
      subject,
      recipients: to,
      body,
      isHTML: true,
      attachments,
    },
    (error, event) => {
      Alert.alert(
        error,
        event,
        [
          { text: 'Ok', onPress: () => console.log('OK: Email Error Response') },
          { text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response') },
        ],
        { cancelable: true },
      );
    },
  );
};

export default MailSender;
