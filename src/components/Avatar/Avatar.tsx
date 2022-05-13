import React from 'react';
import AvatarImage, { TAvatarImage } from './AvatarImage';
import AvatarText, { TAvatarText } from './AvatarText';

type TAvatar = { source?: number } & TAvatarText & Omit<TAvatarImage, 'source'>;

const Avatar = ({ source, label, ...rest }: TAvatar) => {
  if (source) {
    return <AvatarImage source={source} {...rest} />;
  } else {
    return <AvatarText label={label} {...rest} />;
  }
};

export default Avatar;
