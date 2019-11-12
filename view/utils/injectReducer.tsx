import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import getInjectors from './reducerInjectors';
import { Reducer } from 'redux';
import { ReactReduxContext, ReactReduxContextValue } from 'react-redux';
import { IStore } from 'store';

export default ({ key , reducer }: {key: string; reducer: Reducer<any>}) =>
    (WrappedComponent: React.ComponentClass | React.StatelessComponent) => {
  class ReducerInjector extends React.Component {
    static WrappedComponent = WrappedComponent;
    static contextType = ReactReduxContext;
    static displayName = `withReducer(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;

    constructor(props: null, context: ReactReduxContextValue) {
      super(props, context);

      getInjectors(context.store as IStore).injectReducer(key, reducer);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};