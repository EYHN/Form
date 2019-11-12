import { takeEvery, call, put, select } from "redux-saga/effects";
import { LOAD_FORM_RESPONSES } from "./constants";
import { loadResponses, responsesLoaded, responsesLoadingError, IDecryptedResponse } from "./actions";
import { apiFetchFormResponse } from "api/Response";
import { IApiFetchFormResponse } from "@interface/Api/Response";
import { createSelector } from "reselect";
import { makeSelectEditorPagePublicKey, makeSelectEditorPagePrivateKey } from "../selectors";
import crypto from '@eyhn/crypto';
import { IResponse } from "@interface/Response";

function decrypteResponse(responses: IResponse, publickey: ArrayBuffer, privatekey: ArrayBuffer): IDecryptedResponse {
  const encryptedKey = crypto.tools.hexToArrayBuffer(responses.key.encryptedKey);
  
  const aeskey = crypto.rsa.decrypt(privatekey, publickey, encryptedKey);
  const encryptedData = crypto.tools.hexToArrayBuffer(responses.encryptedData);

  // 解密表单内容
  const formdata = crypto.aes.ctr.decrypt(aeskey, encryptedData);

  const aesKeyMac = crypto.hmac.sha256(
    aeskey,
    formdata
  );

  if (crypto.tools.arrayBufferToHex(aesKeyMac) === responses.key.keyMac) {
    return {
      id: responses.id,
      formId: responses.formId,
      template: responses.template,
      date: responses.date,
      value: JSON.parse(crypto.tools.arrayBufferToText(formdata))
    };
  } else {
    throw new Error('Decrypte Error');
  }
}

function* loadResponsesSaga(action: ReturnType<typeof loadResponses>) {
  try {
    const data: IApiFetchFormResponse = yield call(apiFetchFormResponse, action.payload);
    
    const selector = createSelector(
      makeSelectEditorPagePublicKey(),
      makeSelectEditorPagePrivateKey(),
      (publicKey, privateKey) => ({
        publicKey: crypto.tools.hexToArrayBuffer(publicKey),
        privatekey: crypto.tools.hexToArrayBuffer(privateKey)
      }));

    const { publicKey, privatekey }: { publicKey: ArrayBuffer, privatekey: ArrayBuffer } = yield select(selector);
    
    const responses = data.responses.map(response =>
      decrypteResponse(response, publicKey, privatekey)
    );

    yield put(responsesLoaded(responses));
  } catch (err) {
    yield put(responsesLoadingError(err));
  }
}

export default function* editorPageResponsesSaga() {
  yield takeEvery(LOAD_FORM_RESPONSES, loadResponsesSaga)
}
