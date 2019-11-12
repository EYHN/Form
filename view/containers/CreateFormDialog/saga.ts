import { CREATE_NEW_FORM } from "./constants";
import { put, takeEvery, call } from 'redux-saga/effects';
import { createNewForm, newFormCreated, newFormCreatingError } from "./actions";
import { apiNewForm } from "api/Form";
import { $Call } from "utils/types";
import crypto from '@eyhn/crypto';
import { IApiNewFormResponse } from "@interface/Api/Form";

export function* createForm(action: $Call<typeof createNewForm>) {
  try {
    const { n: publickey, d: privatekey } = crypto.rsa.generate(1024, 10001);

    const password = action.payload.password;

    const date = new Date().toUTCString();

    const aeskey = crypto.pbkdf2.sha256(
      crypto.tools.textToArrayBuffer(password),
      crypto.tools.textToArrayBuffer('miku'),
      5000,
      32
    );

    const privateKeyMac = crypto.hmac.sha256(aeskey, privatekey);

    const encryptedPrivateKey = crypto.aes.ctr.encrypt(
      aeskey,
      privatekey
    );

    const data: IApiNewFormResponse = yield call(
      apiNewForm,
      action.payload.template,
      {
        publicKey: crypto.tools.arrayBufferToHex(publickey),
        privateKeyMac: crypto.tools.arrayBufferToHex(privateKeyMac),
        encryptedPrivateKey: crypto.tools.arrayBufferToHex(encryptedPrivateKey)
      },
      date,
      (data: string) => crypto.tools.arrayBufferToHex(
        crypto.rsa.sign(crypto.tools.textToArrayBuffer(data), privatekey, publickey)
      )
    );
    yield put(newFormCreated(data));
    window.location.href = '/editor/' + data.id;
  } catch (err) {
    yield put(newFormCreatingError(err));
  }
}

export default function* createFormDialogSaga() {
  yield takeEvery(CREATE_NEW_FORM, createForm)
}
