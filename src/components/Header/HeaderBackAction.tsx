import { useNavigation } from '@react-navigation/native';
import React, { ComponentPropsWithoutRef } from 'react';

import HeaderAction from './HeaderAction';

type Props = ComponentPropsWithoutRef<typeof HeaderAction>;

const HeaderBackAction = ({ ...rest }: Props) => {
  const { goBack } = useNavigation();
  return <HeaderAction onPress={goBack} bg="red" {...rest} />;
};

export default HeaderBackAction;
