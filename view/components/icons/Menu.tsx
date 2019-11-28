import * as React from 'react';
import SvgIcon, { ISvgIconProps } from './SvgIcon';

const Menu = (props: ISvgIconProps) => (
  <SvgIcon viewBox='0 0 24 24' {...props}>
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
  </SvgIcon>
);

export default Menu;