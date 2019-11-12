import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import getInjectors from './sagaInjectors';
import { ReactReduxContext, ReactReduxContextValue } from 'react-redux';
import { IStore } from 'store';

export default ({ key, saga, mode }: {key: string; saga: () => IterableIterator<any>; mode?: any}) =>
    (WrappedComponent: React.ComponentClass | React.StatelessComponent) => {
  class InjectSaga extends React.Component {
    static WrappedComponent = WrappedComponent;
    static contextType = ReactReduxContext;
    static displayName = `withSaga(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;
    injectors = getInjectors(this.context.store);

    constructor(props: null, context: ReactReduxContextValue) {
      super(props, context);

      this.injectors = getInjectors(context.store as IStore);

      this.injectors.injectSaga(key, { saga, mode }, this.props);
    }

    componentWillUnmount() {
      const { ejectSaga } = this.injectors;

      ejectSaga(key);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(InjectSaga, WrappedComponent);
};