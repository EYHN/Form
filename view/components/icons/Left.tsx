import * as React from 'react';
import SvgIcon, { ISvgIconProps } from './SvgIcon';

const Left = (props: ISvgIconProps) => (
  <SvgIcon viewBox='0 0 24 24' {...props}>
    <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
  </SvgIcon>
);

export default Left;