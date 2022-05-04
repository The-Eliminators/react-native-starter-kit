import { useNavigation } from '@react-navigation/native';
import React from 'react';

import HeaderAction, { THeaderAction } from './HeaderAction';

type Props = Omit<THeaderAction, 'icon'>;

const HeaderBackAction = ({ ...rest }: Props) => {
  const { goBack } = useNavigation();
  return <HeaderAction icon={'left-arrow'} onPress={goBack} {...rest} />;
};

export default HeaderBackAction;
