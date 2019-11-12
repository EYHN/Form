import * as React from 'react';
import SvgIcon, { ISvgIconProps } from './SvgIcon';

const Add = (props: ISvgIconProps) => (
  <SvgIcon viewBox='0 0 24 24' {...props}>
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </SvgIcon>
);

export default Add;