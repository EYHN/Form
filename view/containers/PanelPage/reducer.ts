import * as actions from './actions';
import { $Values } from "utils/types";
import { IForm } from '@interface/Form';
import { LOAD_PANEL_PAGE_SUCCESS, LOAD_PANEL_PAGE, LOAD_PANEL_PAGE_ERROR, DELETE_SAVED_FORMS } from './constants';
export type PanelPageActions = ReturnType<$Values<typeof actions>>;

export interface IPanelPageState {
  forms: IForm[];
  loading: boolean;
  loadingError: boolean;
}

const initialState: IPanelPageState = {
  forms: [],
  loading: false,
  loadingError: false
};

export default function PanelPageReducer(state = initialState, action: PanelPageActions): IPanelPageState {
  switch (action.type) {
    case LOAD_PANEL_PAGE:
      return {
        ...initialState,
        loading: true
      };
    case LOAD_PANEL_PAGE_SUCCESS:
      return {
        ...state,
        forms: action.payload,
        loading: false
      };
    case LOAD_PANEL_PAGE_ERROR:
      return {
        ...state,
        loading: false,
        loadingError: true
      };
    case DELETE_SAVED_FORMS:
      return {
        ...state,
        forms: state.forms.filter((form) => form.id != action.payload.id)
      }
    default:
      return state;
  }
};
