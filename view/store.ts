import { createStore, compose, applyMiddleware, Middleware, Store } from "redux";
import createReducer from './reducers';
import { IFormPageState } from "containers/FormPage/reducer";
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { IEditorPageState } from "containers/EditorPage/reducer";
import { ICreateFormDialogState } from "containers/CreateFormDialog/reducer";
import { IPanelPageState } from "containers/PanelPage/reducer";

export interface IStore extends Store<IState> {
  injectedReducers: any;
  injectedSagas: any;
  runSaga: SagaMiddleware<any>['run'];
}

export interface IState {
  formPage?: IFormPageState;
  editorPage?: IEditorPageState;
  panelPage?: IPanelPageState;
  createFormDialog?: ICreateFormDialogState;
  network: any;
}

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState: any = {}) {
  const middlewares: Middleware[] = [
    sagaMiddleware
  ];

  const enhancers = [
    applyMiddleware(...middlewares)
  ];

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
      typeof window === 'object' &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  
  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers)
  ) as IStore;

  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {};
  store.injectedSagas = {};

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}