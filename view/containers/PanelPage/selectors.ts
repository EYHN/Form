import { IState } from "store";
import { createSelector } from "reselect";

const selectPanelPage = (state: IState) => state.panelPage;

export const makeSelectForms = () => createSelector(
  selectPanelPage,
  (panelState) => panelState.forms
);

export const makeSelectLoading = () => createSelector(
  selectPanelPage,
  (panelState) => panelState.loading
);

export const makeSelectLoadingError = () => createSelector(
  selectPanelPage,
  (panelState) => panelState.loadingError
);