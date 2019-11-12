import * as actions from './actions';
import { $Call, $Values } from "utils/types";
import { LOAD_FORM_PAGE, LOAD_FORM_PAGE_SUCCESS, LOAD_FORM_PAGE_ERROR, SUBMIT_FORM_PAGE, SUBMIT_FORM_PAGE_ERROR, SUBMIT_FORM_PAGE_SUCCESS, RESET_FORM_PAGE } from "./constants";
import { IForm } from '@interface/Form';
export type FormPageActions = $Call<$Values<typeof actions>>;

export interface IFormPageState {
  id: string;
  loading: boolean;
  form: IForm;
  loadingError: boolean;
  submiting: boolean;
  submitingError: boolean;
  submited: boolean;
}

const initialState: IFormPageState = {
  id: null,
  loading: false,
  form: null,
  loadingError: false,
  submiting: false,
  submitingError: false,
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
        submiting: true,
        submitingError: false
      }
    case SUBMIT_FORM_PAGE_SUCCESS:
      return {
        ...state,
        submiting: false,
        submitingError: false,
        submited: true
      }
    case SUBMIT_FORM_PAGE_ERROR:
      return {
        ...state,
        submiting: false,
        submitingError: true
      }
    case RESET_FORM_PAGE:
      return {
        ...state,
        submiting: false,
        submitingError: false,
        submited: false
      }
    default:
      return state;
  }
};
