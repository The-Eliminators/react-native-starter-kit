import React from 'react';
import AssetsImage from 'src/constant/AssetsImage';
import Image, { TImage } from '../common/Image';

export type TAvatarImage = {
  // source: string;
  size?: number;
} & TImage;

const AvatarImage = ({ size = 48, ...rest }: TAvatarImage) => {
  return (
    <Image defaultSource={AssetsImage.DEFAULT_USER} width={size} height={size} borderRadius={size / 2} {...rest} />
  );
};

export default AvatarImage;
