import * as React from 'react';
import SvgIcon, { ISvgIconProps } from './SvgIcon';

const Right = (props: ISvgIconProps) => (
  <SvgIcon viewBox='0 0 24 24' {...props}>
    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
  </SvgIcon>
);

export default Right;