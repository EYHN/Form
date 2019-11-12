import { Action } from "redux";

export default function mergeReducer<S, K extends string, T>
  (baseReducer: (state: any, action: Action) => S, key: K, reducer: (state: any, action: Action) => T) {
  return (state: any, action: Action) => {
    return {
      ...baseReducer(state, action),
      [key]: reducer((state || {})[key], action)
    } as S & Record<K, T>;
  }
}
