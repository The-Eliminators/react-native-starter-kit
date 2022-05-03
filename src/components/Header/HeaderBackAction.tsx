import { useNavigation } from '@react-navigation/native';
import React from 'react';

import HeaderAction from './HeaderAction';

type Props = Omit<typeof HeaderAction, 'icon'>;

const HeaderBackAction = ({ ...rest }: Props) => {
  const { goBack } = useNavigation();
  return <HeaderAction size={16} icon={'left-arrow'} onPress={goBack} {...rest} />;
};

export default HeaderBackAction;