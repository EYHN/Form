import { IState } from "store";
import { createSelector } from "reselect";

const selectFormPage = (state: IState) => state.formPage;

export const makeSelectFormPageId = () => createSelector(
  selectFormPage,
  (formState) => formState.id
);

export const makeSelectFormPageLoading = () => createSelector(
  selectFormPage,
  (formState) => formState.loading
);

export const makeSelectFormPageFormData = () => createSelector(
  selectFormPage,
  (formState) => formState.form
);

export const makeSelectFormPageLoadingError = () => createSelector(
  selectFormPage,
  (formState) => formState.loadingError
);

export const makeSelectFormPageSubmited = () => createSelector(
  selectFormPage,
  (formState) => formState.submited
);

export const makeSelectFormPageSubmitting = () => createSelector(
  selectFormPage,
  (formState) => formState.submitting
);

export const makeSelectFormPageSubmittingError = () => createSelector(
  selectFormPage,
  (formState) => formState.submittingError
);