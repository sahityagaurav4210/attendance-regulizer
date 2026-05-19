import React, { type ReactNode } from 'react';
import IndianFlagImg from '../assets/ind-flag.svg';
import type { IFlagProps } from '../types';

function IndianFlag({ size }: Readonly<IFlagProps>): ReactNode {
  const width = size || 24;
  const height = size || 24;

  return (
    <img src={IndianFlagImg} alt="Indian Flag" width={width} height={height} />
  );
}

export default React.memo(IndianFlag);
