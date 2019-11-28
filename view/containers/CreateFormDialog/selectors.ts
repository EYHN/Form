import { IState } from "store";
import { createSelector } from "reselect";

const selectCreateFormDialog = (state: IState) => state.createFormDialog;

export const makeSelectCreateFormDialogCreating = () => createSelector(
  selectCreateFormDialog,
  (homeState) => homeState.creating
);

export const makeSelectCreateFormDialogCreated = () => createSelector(
  selectCreateFormDialog,
  (homeState) => homeState.created
);

export const makeSelectCreateFormDialogForm = () => createSelector(
  selectCreateFormDialog,
  (homeState) => homeState.form
);

export const makeSelectCreateFormDialogError = () => createSelector(
  selectCreateFormDialog,
  (homeState) => homeState.error
);
