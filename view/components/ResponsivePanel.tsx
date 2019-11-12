import React from 'react';
import Media from "react-media";
import Dialog from "./Dialog";
import Activity from "./Activity";

interface IResponsivePanelProps {
  form?: boolean;
  title?: string;
  submitLabel?: React.ReactNode;
  onClose?: () => void;
  onSubmit?: () => void;
  bodyClassName?: string;
}

const ResponsivePanel: React.SFC<IResponsivePanelProps> = ({children, ...props}) => (
  <Media query="(max-width: 770px)">
      {matches =>
        matches ? <Activity {...props}>
          {children}
        </Activity>
        : <Dialog {...props}>
          {children}
        </Dialog>}
  </Media>
);

export default ResponsivePanel;