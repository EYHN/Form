import * as actions from './actions';
import { $Values } from "utils/types";
import { CREATE_NEW_FORM, CREATE_NEW_FORM_SUCCESS, CREATE_NEW_FORM_ERROR, CLEAR_NEW_FORM_STATE } from "./constants";
import { IForm } from '@interface/Form';
export type CreateFormDialogActions = ReturnType<$Values<typeof actions>>;

export interface ICreateFormDialogState {
  creating: boolean;
  created: boolean;
  error: boolean;
  form: IForm;
}

const initialState: ICreateFormDialogState = {
  creating: false,
  form: null,
  error: false,
  created: false
};

export default function createFormDialogReducer(state = initialState, action: CreateFormDialogActions): ICreateFormDialogState {
  switch (action.type) {
    case CLEAR_NEW_FORM_STATE:
      return initialState;
    case CREATE_NEW_FORM:
      return {
        ...state,
        creating: true,
        error: false
      };
    case CREATE_NEW_FORM_SUCCESS:
      return {
        ...state,
        creating: false,
        created: true,
        form: action.payload.form
      };
    case CREATE_NEW_FORM_ERROR:
      return {
        ...state,
        creating: false,
        error: true
      };
    default:
      return state;
  }
};