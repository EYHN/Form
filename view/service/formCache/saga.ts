import { takeEvery, call } from "redux-saga/effects";
import { LOAD_EDITOR_PAGE_SUCCESS, SAVE_EDITOR_PAGE_SUCCESS } from "containers/EditorPage/constants";
import { editorPageLoaded, editorPageSaved } from "containers/EditorPage/actions";
import { pushFormCache, deleteFormCache, updateFormCache } from "models/formCache";
import { DELETE_SAVED_FORMS } from "containers/PanelPage/constants";
import { deleteSavedForms } from "containers/PanelPage/actions";

function* formLoadedSaga(action: ReturnType<typeof editorPageLoaded>) {
  yield call(pushFormCache, action.payload.id, action.payload, new Date().toUTCString());
}

function* formDeletedSaga(action: ReturnType<typeof deleteSavedForms>) {
  yield call(deleteFormCache, action.payload.id);
}

function* formSavedSaga(action: ReturnType<typeof editorPageSaved>) {
  yield call(updateFormCache, action.payload.id, action.payload, new Date().toUTCString());
}

export default function* keyCacheSaga() {
  yield takeEvery(LOAD_EDITOR_PAGE_SUCCESS, formLoadedSaga);
  yield takeEvery(DELETE_SAVED_FORMS, formDeletedSaga);
  yield takeEvery(SAVE_EDITOR_PAGE_SUCCESS, formSavedSaga);
}
