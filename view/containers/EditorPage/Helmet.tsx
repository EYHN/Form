import React from 'react';
import ReactHelmet from 'react-helmet';

const Helmet: React.SFC<{formTitle: string}> = ({formTitle}) => (
  <>
    <ReactHelmet>
      <title>{formTitle ? formTitle + ' - The Form' : 'The Form'}</title>
    </ReactHelmet>
  </>
);

export default Helmet;
