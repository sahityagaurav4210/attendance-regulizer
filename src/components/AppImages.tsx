import React, { type ReactNode } from 'react';
import type { IAppImagesProps } from '../types';
import AppConstants from '../configs/AppConstants';

function AppImages({
  uri,
  altTxt,
  width,
  height,
  type,
}: Readonly<IAppImagesProps>): ReactNode {
  const imageAltText = altTxt || 'App Image';
  const imageWidth = width ? `w-[${width}]` : 'w-full';
  const imageHeight = height ? `h-[${height}]` : 'h-full';
  const className = `rounded-xl ${imageWidth} ${imageHeight} object-center aspect-square`;
  const imgType = type || AppConstants.IMG_TYPE.LOGO;
  const maxImgWidth =
    AppConstants.IMG_SIZES[imgType as keyof typeof AppConstants.IMG_SIZES]
      .width;

  console.log(maxImgWidth, 'maxImgWidth');

  return (
    <div className="p-2" style={{ maxWidth: maxImgWidth }}>
      <img src={uri} alt={imageAltText} className={className} />
    </div>
  );
}

export default React.memo(AppImages);
