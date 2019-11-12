import createReducer from '../reducers';
import { Reducer } from 'redux';
import { IStore } from 'store';

export function injectReducerFactory(store: IStore) {
  return (key: string, reducer: Reducer<any>) => {
    if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) { return; }

    store.injectedReducers[key] = reducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.injectedReducers));
  };
}

export default function getInjectors(store: IStore) {
  return {
    injectReducer: injectReducerFactory(store)
  };
}