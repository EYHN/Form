import { IState } from "store";
import { createSelector } from "reselect";


const selectEditorPageResponse = (state: IState) => state.editorPage.responses;

export const makeSelectResponses = () => createSelector(
  selectEditorPageResponse,
  (response) => response.responses
);

export const makeSelectLoadingResponses = () => createSelector(
  selectEditorPageResponse,
  (response) => response.loadingResponses
);

export const makeSelectLoadingResponsesError = () => createSelector(
  selectEditorPageResponse,
  (response) => response.loadingResponsesError
);
