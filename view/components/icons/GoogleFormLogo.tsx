import * as React from 'react';
import SvgIcon, { ISvgIconProps } from './SvgIcon';

const GoogleFormLogo = React.forwardRef<SVGSVGElement, ISvgIconProps>((props: ISvgIconProps, ref) => (
  <SvgIcon viewBox='0 0 48 48' ref={ref} {...props}>
    <path style={{fill:'#673AB7'}} d="M12,44c-1.657,0-3-1.343-3-3V7c0-1.657,1.343-3,3-3h16l11,11v26c0,1.657-1.343,3-3,3H12z"></path>
    <polygon style={{fill:'#5E35B1'}} points="39,15 28.883,14.125 39,24.124 "></polygon>
    <path style={{fill:'#B39DDB'}} d="M39,15h-8c-1.657,0-3-1.343-3-3V4L39,15z"></path>
    <rect x="22" y="23" style={{fill:'#F5F5F5'}} width="10" height="2"></rect>
    <rect x="22" y="28" style={{fill:'#F5F5F5'}} width="10" height="2"></rect>
    <rect x="22" y="33" style={{fill:'#F5F5F5'}} width="10" height="2"></rect>
    <circle style={{fill:'#F5F5F5'}} cx="17.5" cy="24" r="1.5"></circle>
    <circle style={{fill:'#F5F5F5'}} cx="17.5" cy="29" r="1.5"></circle>
    <circle style={{fill:'#F5F5F5'}} cx="17.5" cy="34" r="1.5"></circle>
  </SvgIcon>
));

export default GoogleFormLogo;