import * as actions from './actions';
import { $Values } from "utils/types";
import { LOAD_FORM_PAGE, LOAD_FORM_PAGE_SUCCESS, LOAD_FORM_PAGE_ERROR, SUBMIT_FORM_PAGE, SUBMIT_FORM_PAGE_ERROR, SUBMIT_FORM_PAGE_SUCCESS, RESET_FORM_PAGE, UNLOAD_FORM_PAGE } from "./constants";
import { IForm } from '@interface/Form';
export type FormPageActions = ReturnType<$Values<typeof actions>>;

export interface IFormPageState {
  id: string;
  loading: boolean;
  form: IForm;
  loadingError: boolean;
  submitting: boolean;
  submittingError: boolean;
  submited: boolean;
}

const initialState: IFormPageState = {
  id: null,
  loading: false,
  form: null,
  loadingError: false,
  submitting: false,
  submittingError: false,
  submited: false
};

export default function formPageReducer(state = initialState, action: FormPageActions): IFormPageState {
  switch (action.type) {
    case LOAD_FORM_PAGE:
      return {
        ...initialState,
        id: action.payload,
        loading: true
      };
    case UNLOAD_FORM_PAGE:
      return initialState;
    case LOAD_FORM_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        form: action.payload,
        loadingError: false
      };
    case LOAD_FORM_PAGE_ERROR:
      return {
        ...state,
        loading: false,
        loadingError: true
      };
    case SUBMIT_FORM_PAGE:
      return {
        ...state,
        submitting: true,
        submittingError: false
      }
    case SUBMIT_FORM_PAGE_SUCCESS:
      return {
        ...state,
        submitting: false,
        submittingError: false,
        submited: true
      }
    case SUBMIT_FORM_PAGE_ERROR:
      return {
        ...state,
        submitting: false,
        submittingError: true
      }
    case RESET_FORM_PAGE:
      return {
        ...state,
        submitting: false,
        submittingError: false,
        submited: false
      }
    default:
      return state;
  }
};
