import * as actions from './actions';
import { $Call, $Values } from "utils/types";
import { CREATE_NEW_FORM, CREATE_NEW_FORM_SUCCESS, CREATE_NEW_FORM_ERROR, CLEAR_NEW_FORM_STATE } from "./constants";
export type CreateFormDialogActions = $Call<$Values<typeof actions>>;

export interface ICreateFormDialogState {
  creating: boolean;
  error: boolean;
}

const initialState: ICreateFormDialogState = {
  creating: false,
  error: false
};

export default function createFormDialogReducer(state = initialState, action: CreateFormDialogActions): ICreateFormDialogState {
  switch (action.type) {
    case CLEAR_NEW_FORM_STATE:
      return initialState;
    case CREATE_NEW_FORM:
      return {
        creating: true,
        error: false
      };
    case CREATE_NEW_FORM_SUCCESS:
      return {
        creating: false,
        error: false
      };
    case CREATE_NEW_FORM_ERROR:
      return {
        creating: false,
        error: true
      };
    default:
      return state;
  }
};