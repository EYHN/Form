import React from 'react';
import Loadable from 'react-loadable';
import LoadingIndicator from 'components/LoadingIndicator';

export default Loadable({
  loader: () => import(/* webpackChunkName: "editpage" */ './index'),
  loading: ({pastDelay}) => {
    if (pastDelay) return <LoadingIndicator />
    else return null;
  }
});
