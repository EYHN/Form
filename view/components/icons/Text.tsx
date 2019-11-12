import * as React from 'react';
import SvgIcon, { ISvgIconProps } from './SvgIcon';

const Text = (props: ISvgIconProps) => (
  <SvgIcon viewBox='0 0 24 24' {...props}>
    <path d="M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z"/>
  </SvgIcon>
);

export default Text;