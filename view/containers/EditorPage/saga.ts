import { LOAD_EDITOR_PAGE, UPDATE_EDITOR_PAGE_FORM_TEMPLATE, SAVE_EDITOR_PAGE_ERROR, SAVE_EDITOR_PAGE_SUCCESS, SAVE_EDITOR_PAGE, UNLOCK_EDITOR_PAGE } from "./constants";
import { put, takeEvery, call, select, takeLatest, take, debounce } from 'redux-saga/effects';
import { loadEditorPage, editorPageLoaded, editorPageLoadingError, saveEditorPage, editorPageSaved, editorPageSavingError, unlockEditorPage, editorPageUnlockingError, editorPageUnlocked } from "./actions";
import { apiFetchForm, apiUpdateForm } from "api/Form";
import { $Call } from "utils/types";
import { makeSelectEditorPagePrivateKey, makeSelectEditorPageFormTemplate, makeSelectEditorPagePublicKey, makeSelectEditorPageFormKey, makeSelectEditorPageFormId } from "./selectors";
import { createSelector } from "reselect";
import crypto from '@eyhn/crypto';
import { IForm, IFormTemplate } from "@interface/Form";
import editorPageResponsesSaga from "./Responses/saga";
import { keyCacheGet, keyCacheDelete, keyCacheSet } from "models/keyCache";

export function* loadFormSaga(action: $Call<typeof loadEditorPage>) {
  try {
    const data: IForm = yield call(apiFetchForm, action.payload);
    yield put(editorPageLoaded(data));

    // read aes key cache
    const keyCache = yield call(keyCacheGet, data.id)
    if (keyCache) {
      const formKey = data.key;

      const encryptedPrivateKey = crypto.tools.hexToArrayBuffer(
        formKey.encryptedPrivateKey
      );

      const privatekey = crypto.aes.ctr.decrypt(
        keyCache,
        encryptedPrivateKey
      );

      const privateKeyMac = crypto.hmac.sha256(keyCache, privatekey);

      if (crypto.tools.arrayBufferToHex(privateKeyMac) === formKey.privateKeyMac) {
        // Key is right, unlock the form.
        yield put(editorPageUnlocked(crypto.tools.arrayBufferToHex(privatekey)));
      } else {
        // Key in the cache is wrong, delete the cache.
        keyCacheDelete(data.id);
      }
    }

  } catch (err) {
    yield put(editorPageLoadingError(err));
  }
}

export function* unlockFormSaga(action: $Call<typeof unlockEditorPage>) {
  try {
    const password = action.payload;

    const formKey = makeSelectEditorPageFormKey()(yield select());

    const encryptedPrivateKey = crypto.tools.hexToArrayBuffer(
      formKey.encryptedPrivateKey
    );

    const aeskey = crypto.pbkdf2.sha256(
      crypto.tools.textToArrayBuffer(password),
      crypto.tools.textToArrayBuffer('miku'),
      5000,
      32
    );

    const privatekey = crypto.aes.ctr.decrypt(
      aeskey,
      encryptedPrivateKey
    );

    const privateKeyMac = crypto.hmac.sha256(aeskey, privatekey);

    if (crypto.tools.arrayBufferToHex(privateKeyMac) === formKey.privateKeyMac) {
      yield put(editorPageUnlocked(crypto.tools.arrayBufferToHex(privatekey)));

      // save aes key
      const formId = makeSelectEditorPageFormId()(yield select());
      yield call(keyCacheSet, formId, aeskey);
    } else {
      throw new Error('Password Error');
    }
  } catch (err) {
    yield put(editorPageUnlockingError(err));
  }
}

export function* saveForm() {
  try {
    const selector = createSelector(
      makeSelectEditorPageFormId(),
      makeSelectEditorPageFormTemplate(),
      makeSelectEditorPagePublicKey(),
      makeSelectEditorPagePrivateKey(),
      (id, template, publicKey, privateKey) => ({
        id,
        template,
        publicKey: crypto.tools.hexToArrayBuffer(publicKey),
        privatekey: crypto.tools.hexToArrayBuffer(privateKey)
      }));

    const { id, template, publicKey, privatekey }: { id: string, template: IFormTemplate, publicKey: ArrayBuffer, privatekey: ArrayBuffer } = yield select(selector);

    yield call(apiUpdateForm,
      id,
      template,
      (data: string) => crypto.tools.arrayBufferToHex(
        crypto.rsa.sign(crypto.tools.textToArrayBuffer(data), privatekey, publicKey)
      )
    );
    yield put(editorPageSaved());
  } catch (err) {
    yield put(editorPageSavingError(err));
  }
}

export function* updateForm() {
  yield put(saveEditorPage());
  yield take([SAVE_EDITOR_PAGE_ERROR, SAVE_EDITOR_PAGE_SUCCESS]);
}

export default function* editorPageSaga() {
  yield takeEvery(LOAD_EDITOR_PAGE, loadFormSaga);
  yield takeEvery(UNLOCK_EDITOR_PAGE, unlockFormSaga);
  yield takeLatest(SAVE_EDITOR_PAGE, saveForm);
  yield debounce(1000, UPDATE_EDITOR_PAGE_FORM_TEMPLATE, updateForm);

  yield call(editorPageResponsesSaga);
}
