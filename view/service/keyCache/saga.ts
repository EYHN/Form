import { LOAD_EDITOR_PAGE_SUCCESS, UNLOCK_EDITOR_PAGE_SUCCESS } from "containers/EditorPage/constants";
import { takeEvery, select, call, put } from "redux-saga/effects";
import { editorPageLoaded, editorPageUnlocked } from "containers/EditorPage/actions";
import { makeSelectEditorPageFormId } from "containers/EditorPage/selectors";
import { keyCacheGet, keyCacheDelete, keyCacheCreate, IKeyCache } from "models/keyCache";
import crypto from '@eyhn/crypto';
import { CREATE_NEW_FORM_SUCCESS } from "containers/CreateFormDialog/constants";
import { newFormCreated } from "containers/CreateFormDialog/actions";

export function* formLoadedSaga(action: ReturnType<typeof editorPageLoaded>) {
  const form = action.payload;
  // read private key cache
  const keyCache: IKeyCache = yield call(keyCacheGet, form.id)
  if (keyCache) {

    try {
      const formKey = form.key;

      const privateKeyMac = crypto.hmac.sha256(
        crypto.tools.hexToArrayBuffer(keyCache.aesKey),
        crypto.tools.hexToArrayBuffer(keyCache.privateKey)
      );

      if (crypto.tools.arrayBufferToHex(privateKeyMac) === formKey.privateKeyMac) {
        // Key is right, unlock the form.
        yield put(editorPageUnlocked(keyCache));
      } else {
        // Key in the cache is wrong, delete the cache.
        keyCacheDelete(form.id);
      }
    } catch (err) {
      console.error('Error key cache.', err);
      keyCacheDelete(form.id);
    }
  }
}

export function* formUnlockedSaga(action: ReturnType<typeof editorPageUnlocked>) {
  // save private key
  const formId = makeSelectEditorPageFormId()(yield select());
  const privateKey = action.payload.privateKey;
  const aesKey = action.payload.aesKey;
  yield call(keyCacheCreate, formId, privateKey, aesKey);
}

export function* newFormCreatedSaga(action: ReturnType<typeof newFormCreated>) {
  const formId = action.payload.form.id;
  const privateKey = action.payload.privateKey;
  const aesKey = action.payload.aesKey;
  yield call(keyCacheCreate, formId, privateKey, aesKey);
}

export default function* keyCacheSaga() {
  yield takeEvery(CREATE_NEW_FORM_SUCCESS, newFormCreatedSaga);
  yield takeEvery(LOAD_EDITOR_PAGE_SUCCESS, formLoadedSaga);
  yield takeEvery(UNLOCK_EDITOR_PAGE_SUCCESS, formUnlockedSaga);
}
