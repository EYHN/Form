import * as actions from './actions';
import { $Call, $Values } from "utils/types";
import { LOAD_FORM_RESPONSES, LOAD_FORM_RESPONSES_ERROR, LOAD_FORM_RESPONSES_SUCCESS } from './constants';
import { IDecryptedResponse } from './actions';
export type EditorPageResponsesActions = $Call<$Values<typeof actions>>;

export interface IEditorPageResponsesState {
  loadingResponses: boolean;
  loadingResponsesError: boolean;
  responses: IDecryptedResponse[]
}

const initialState: IEditorPageResponsesState = {
  loadingResponses: false,
  loadingResponsesError: false,
  responses: []
};

export default function editorPageResponsesReducer(state = initialState, action: EditorPageResponsesActions): IEditorPageResponsesState {
  switch (action.type) {
    case LOAD_FORM_RESPONSES:
      return {
        ...initialState,
        loadingResponses: true
      };
    case LOAD_FORM_RESPONSES_SUCCESS:
      return {
        ...state,
        responses: action.payload,
        loadingResponses: false,
        loadingResponsesError: false
      };
    case LOAD_FORM_RESPONSES_ERROR:
      return {
        ...state,
        loadingResponses: true,
        loadingResponsesError: true
      };
    default:
      return state;
  }
};