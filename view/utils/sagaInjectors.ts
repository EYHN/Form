import {
  DAEMON,
  ONCE_TILL_UNMOUNT,
  RESTART_ON_REMOUNT,
} from './constants';
import { IStore } from 'store';

/**
 * Return a function to run saga.
 * @param store redux store
 * @param isValid Has the store been checked?
 */
export function injectSagaFactory(store: IStore) {
  return (key: string, descriptor: any = {}, args?: any) => {

    const newDescriptor = { ...descriptor, mode: descriptor.mode || RESTART_ON_REMOUNT };
    const { saga, mode } = newDescriptor;

    let hasSaga = Reflect.has(store.injectedSagas, key);

    if (process.env.NODE_ENV !== 'production') {
      const oldDescriptor = store.injectedSagas[key];
      if (hasSaga && oldDescriptor.saga !== saga) {
        oldDescriptor.task.cancel();
        hasSaga = false;
      }
    }

    if (!hasSaga || (hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT)) {
      store.injectedSagas[key] = { ...newDescriptor, task: store.runSaga(saga, args) };
    }
  };
}

/**
 * Return a function to remove saga.
 * @param store redux store
 * @param isValid Has the store been checked?
 */
export function ejectSagaFactory(store: IStore) {
  return (key: string) => {

    if (Reflect.has(store.injectedSagas, key)) {
      const descriptor = store.injectedSagas[key];
      if (descriptor.mode !== DAEMON) {
        descriptor.task.cancel();
        if (process.env.NODE_ENV === 'production') {
          store.injectedSagas[key] = 'done';
        }
      }
    }
  };
}

export default function getInjectors(store: IStore) {

  return {
    injectSaga: injectSagaFactory(store),
    ejectSaga: ejectSagaFactory(store)
  };
}