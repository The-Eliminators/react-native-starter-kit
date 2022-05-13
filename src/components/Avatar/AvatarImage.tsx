import React from 'react';
import Image, { TImage } from '../common/Image';
import AssetsImage from 'src/constant/AssetsImage';

export type TAvatarImage = {
  size?: number;
} & TImage;

const AvatarImage = ({ size = 48, ...rest }: TAvatarImage) => {
  return (
    <Image defaultSource={AssetsImage.DEFAULT_USER} width={size} height={size} borderRadius={size / 2} {...rest} />
  );
};

export default AvatarImage;
