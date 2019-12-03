import { LOAD_FORM_PAGE, SUBMIT_FORM_PAGE } from "./constants";
import { put, takeEvery, call, takeLeading, select } from 'redux-saga/effects';
import { formPageLoadingError, loadFormPage, formPageLoaded, submitFormPage, formPageSubmittingError, formPageSubmited } from "./actions";
import { apiFetchForm } from "api/Form";
import { IForm } from "@interface/Form";
import crypto from '@eyhn/crypto';
import { apiNewFormResponse } from "api/Response";
import { createSelector } from "reselect";
import { makeSelectFormPageId, makeSelectFormPageFormData } from "./selectors";

export function* getForm(action: ReturnType<typeof loadFormPage>) {
  try {
    const data: IForm = yield call(apiFetchForm, action.payload);
    yield put(formPageLoaded(data));
  } catch (err) {
    yield put(formPageLoadingError(err));
  }
}

export function* submitFormSaga(action: ReturnType<typeof submitFormPage>) {
  try {
    const selector = createSelector(
      makeSelectFormPageId(),
      makeSelectFormPageFormData(),
      (id, form) => ({
        id,
        form
      }));
    
    const { id, form }: { id: string, form: IForm } = yield select(selector);

    const aeskey = crypto.prng()(new Uint8Array(32));

    const data = crypto.tools.textToArrayBuffer(JSON.stringify(action.payload));

    const encryptedData = crypto.aes.ctr.encrypt(
      aeskey,
      data
    );

    const AESkeyMac = crypto.hmac.sha256(
      aeskey,
      data
    );

    const encryptedAESkey = crypto.rsa.encrypt(
      aeskey,
      crypto.tools.hexToArrayBuffer(form.key.publicKey),
      10001
    );

    yield call(apiNewFormResponse,
      id,
      crypto.tools.arrayBufferToHex(encryptedData),
      form.template,
      {
        encryptedKey: crypto.tools.arrayBufferToHex(encryptedAESkey),
        keyMac: crypto.tools.arrayBufferToHex(AESkeyMac)
      },
      new Date().toUTCString()
    );

    yield put(formPageSubmited())
  } catch (err) {
    yield put(formPageSubmittingError(err))
  }
}

export default function* formPageSaga() {
  yield takeEvery(LOAD_FORM_PAGE, getForm);
  yield takeLeading(SUBMIT_FORM_PAGE, submitFormSaga);
}