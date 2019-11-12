import { IState } from "store";
import { createSelector } from "reselect";

const selectCreateFormDialog = (state: IState) => state.createFormDialog;

export const makeSelectCreateFormDialogCreating = () => createSelector(
  selectCreateFormDialog,
  (homeState) => homeState.creating
);

export const makeSelectCreateFormDialogError = () => createSelector(
  selectCreateFormDialog,
  (homeState) => homeState.error
);
