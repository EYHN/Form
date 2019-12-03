import { LOAD_EDITOR_PAGE, UPDATE_EDITOR_PAGE_FORM_TEMPLATE, SAVE_EDITOR_PAGE_ERROR, SAVE_EDITOR_PAGE_SUCCESS, SAVE_EDITOR_PAGE, UNLOCK_EDITOR_PAGE } from "./constants";
import { put, takeEvery, call, select, takeLatest, take, debounce } from 'redux-saga/effects';
import { loadEditorPage, editorPageLoaded, editorPageLoadingError, saveEditorPage, editorPageSaved, editorPageSavingError, unlockEditorPage, editorPageUnlockingError, editorPageUnlocked } from "./actions";
import { apiFetchForm, apiUpdateForm } from "api/Form";
import { makeSelectEditorPagePrivateKey, makeSelectEditorPageFormTemplate, makeSelectEditorPagePublicKey, makeSelectEditorPageFormKey, makeSelectEditorPageFormId } from "./selectors";
import { createSelector } from "reselect";
import crypto from '@eyhn/crypto';
import { IForm, IFormTemplate } from "@interface/Form";
import editorPageResponsesSaga from "./Responses/saga";
import { IApiUpdateFormResponse } from "@interface/Api/Form";

export function* loadFormSaga(action: ReturnType<typeof loadEditorPage>) {
  try {
    const data: IForm = yield call(apiFetchForm, action.payload);
    yield put(editorPageLoaded(data));
  } catch (err) {
    yield put(editorPageLoadingError(err));
  }
}

export function* unlockFormSaga(action: ReturnType<typeof unlockEditorPage>) {
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
      yield put(editorPageUnlocked({
        privateKey: crypto.tools.arrayBufferToHex(privatekey),
        aesKey: crypto.tools.arrayBufferToHex(aeskey)
      }));
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

    const form: IApiUpdateFormResponse = yield call(apiUpdateForm,
      id,
      template,
      (data: string) => crypto.tools.arrayBufferToHex(
        crypto.rsa.sign(crypto.tools.textToArrayBuffer(data), privatekey, publicKey)
      )
    );
    yield put(editorPageSaved(form));
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
