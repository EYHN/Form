import { LOAD_PANEL_PAGE } from "./constants";
import { takeEvery, put, call } from 'redux-saga/effects';
import { panelPageLoaded } from "./actions";
import { readAllFormCache, IFormCache } from "models/formCache";

function* loadPanelPageSaga() {
  const cache: IFormCache = yield call(readAllFormCache) || {};
  const forms = Reflect.ownKeys(cache).map((id: string) => cache[id].form)
  yield put(panelPageLoaded(forms))
}

export default function* formPageSaga() {
  yield takeEvery(LOAD_PANEL_PAGE, loadPanelPageSaga);
}