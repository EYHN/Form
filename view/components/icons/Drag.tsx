import * as React from 'react';
import SvgIcon, { ISvgIconProps } from './SvgIcon';

const Drag = React.forwardRef<SVGSVGElement, ISvgIconProps>((props: ISvgIconProps, ref) => (
  <SvgIcon viewBox='0 0 24 24' ref={ref} {...props}>
    <circle cy='6.5' cx='9.5' r='1.5'></circle>
    <circle cy='6.5' cx='14.5' r='1.5'></circle>
    <circle cy='12.5' cx='9.5' r='1.5'></circle>
    <circle cy='12.5' cx='14.5' r='1.5'></circle>
    <circle cy='18.5' cx='9.5' r='1.5'></circle>
    <circle cy='18.5' cx='14.5' r='1.5'></circle>
  </SvgIcon>
));

export default Drag;