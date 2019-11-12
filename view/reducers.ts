
import { Reducer, combineReducers } from 'redux';

const networkInitialState = {
  offline: false
};

function networkReducer(state = networkInitialState/*, action: any*/) {
  return state
}

export default function createReducer(asyncReducers?: {[key: string]: Reducer<any>}) {
  return combineReducers({
    network: networkReducer,
    ...asyncReducers
  });
}