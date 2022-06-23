import React from 'react';
import { Alert } from 'react-native';
import config from 'src/constant/config';
import i18n from 'src/i18n';
import log from './logger';
import MailSender from './mailSender';

type Props = {};
type State = { hasError: boolean };

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    log.error(error, errorInfo);
    this.setState({
      hasError: true,
    });
  }

  sendErrorLogs = () =>
    MailSender({
      subject: i18n.t('logMailSubject'),
      to: [...config.MAIL_RECIPIENT],
      body: i18n.t('logMailBody'),
      attachments: [{ path: `${config.LOGGER_FILE_PATH}/${config.LOGGER_FILE_NAME}`, type: 'txt' }],
    });

  render() {
    if (this.state.hasError) {
      Alert.alert(i18n.t('crashPopupTitle'), i18n.t('crashPopupMessage'), [
        { text: i18n.t('cancel'), style: 'cancel' },
        { text: i18n.t('report'), style: 'destructive', onPress: this.sendErrorLogs },
      ]);
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
