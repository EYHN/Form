import React from 'react';
import ReactHelmet from 'react-helmet';
const sanitizeCSS = require('sanitize.css/sanitize.css');
const globalCSS = require('../../global.css');

const Helmet: React.SFC = () => (
  <>
    <ReactHelmet>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"></link>
    </ReactHelmet>
    <style type="text/css">
      {sanitizeCSS}
    </style>
    <style type="text/css">
      {globalCSS}
    </style>
  </>
);

export default Helmet;
