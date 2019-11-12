import React from 'react';
import SvgIcon, { ISvgIconProps } from './SvgIcon';

const Warning = (props: ISvgIconProps) => (
  <SvgIcon viewBox='0 0 24 24' {...props}>
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
  </SvgIcon>
);

export default Warning;