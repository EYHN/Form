import React from 'react';
import { Route } from "react-router";

const Status: React.SFC<{code: number}> = ({ code, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) staticContext.statusCode = code;
      return children;
    }}
  />
);

export default Status;
