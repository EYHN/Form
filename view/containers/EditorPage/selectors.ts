import { IState } from 'store';
import { createSelector } from 'reselect';

const selectEditorPage = (state: IState) => state.editorPage;

export const makeSelectEditorPageFormId = () => createSelector(
  selectEditorPage,
  (editorPage) => editorPage.id
);

export const makeSelectEditorPageLoading = () => createSelector(
  selectEditorPage,
  (editorPage) => editorPage.loading
);

export const makeSelectEditorPageFormDate = () => createSelector(
  selectEditorPage,
  (editorPage) => editorPage.date
);

export const makeSelectEditorPagePublicUrl = () => createSelector(
  selectEditorPage,
  (editorPage) => editorPage.publicUrl
);

export const makeSelectEditorPageFormTemplate = () => createSelector(
  selectEditorPage,
  (editorPage) => editorPage.template
);

export const makeSelectEditorPageError = () => createSelector(
  selectEditorPage,
  (editorPage) => editorPage.error
);

export const makeSelectEditorPageUnlocked = () => createSelector(
  selectEditorPage,
  (editorPage) => editorPage.unlocked
);

export const makeSelectEditorPageUnlockingError = () => createSelector(
  selectEditorPage,
  (editorPage) => editorPage.unlockingError
);

export const makeSelectEditorPagePrivateKey = () => createSelector(
  selectEditorPage,
  (editorPage) => editorPage.privateKey
);

export const makeSelectEditorPageFormKey = () => createSelector(
  selectEditorPage,
  (editorPage) => editorPage.formKey
);

export const makeSelectEditorPagePublicKey = () => createSelector(
  selectEditorPage,
  (editorPage) => editorPage.publicKey
);

export const makeSelectEditorPageSaving = () => createSelector(
  selectEditorPage,
  (editorPage) => editorPage.saving
);

export const makeSelectEditorPageSavingError = () => createSelector(
  selectEditorPage,
  (editorPage) => editorPage.savingError
);