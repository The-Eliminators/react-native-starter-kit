import React, { ReactNode, useState } from 'react';
import { Snackbar } from '../components';
import { SnackbarProps as SnackbarComponentProps } from 'src/components/common/Snackbar';
export const SnackbarContext = React.createContext<SnackbarContextType>(props => {});

type Props = {
  children: ReactNode;
};

const DURATION = {
  short: 2000,
  medium: 6000,
  long: 8000,
};

type SnackbarProps = Omit<SnackbarComponentProps, 'visible'> & {
  duration?: keyof typeof DURATION;
};

type SnackbarContextType = (props: SnackbarProps) => void;

const SnackbarProvider = ({ children }: Props) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<SnackbarProps>({ text: '' });

  const hideTimeout = React.useRef<NodeJS.Timeout | undefined>(undefined);

  const handleAction = () => {
    setVisible(false);
    data.action?.onPress();
  };

  const showSnackbar = ({ duration = 'short', ...rest }: SnackbarProps) => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
    }
    if (visible) {
      setVisible(false);
      setTimeout(() => {
        setVisible(true);
        setData(rest);
        hideTimeout.current = setTimeout(() => setVisible(false), DURATION[duration]);
      }, 100);
    } else {
      setVisible(true);
      setData(rest);
      hideTimeout.current = setTimeout(() => setVisible(false), DURATION[duration]);
    }
  };

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      <Snackbar
        text={data.text}
        action={data.action && { label: data.action.label, onPress: handleAction }}
        type={data.type}
        visible={visible}
      />
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
