import React from 'react';
import Status from 'components/Status';

export default class NotFoundPage extends React.PureComponent {
  public render() {
    return <>
      <Status code={404}>
        404
      </Status>
    </>
  }
}
