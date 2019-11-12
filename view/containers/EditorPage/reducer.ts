import * as actions from './actions';
import { $Values } from "utils/types";
import { LOAD_EDITOR_PAGE, LOAD_EDITOR_PAGE_SUCCESS, LOAD_EDITOR_PAGE_ERROR, UPDATE_EDITOR_PAGE_FORM_TEMPLATE, SAVE_EDITOR_PAGE, SAVE_EDITOR_PAGE_SUCCESS, SAVE_EDITOR_PAGE_ERROR, UNLOCK_EDITOR_PAGE_SUCCESS, UNLOCK_EDITOR_PAGE_ERROR, UNLOCK_EDITOR_PAGE } from "./constants";
import { IFormTemplate, IFormKey } from '@interface/Form';
import editorPageResponsesReducer from './Responses/reducer';
import mergeReducer from 'utils/mergeReducer';
export type EditorPageActions = ReturnType<$Values<typeof actions>>;

interface IEditorPageMainState {
  id: string;
  loading: boolean;
  template: IFormTemplate;
  date: string;
  publicUrl: string;
  unlocked: boolean;
  unlockingError: boolean;
  publicKey: string;
  privateKey: string;
  formKey: IFormKey;
  error: Error | boolean;
  saving: boolean;
  savingError: boolean;
}

const initialState: IEditorPageMainState = {
  id: null,
  loading: false,
  template: null,
  date: null,
  publicUrl: null,
  error: false,
  unlocked: false,
  unlockingError: false,
  publicKey: null,
  privateKey: null,
  formKey: null,
  saving: false,
  savingError: false
};

function editorPageMainReducer(state = initialState, action: EditorPageActions): IEditorPageMainState {
  switch (action.type) {
    case LOAD_EDITOR_PAGE:
      return {
        ...initialState,
        id: action.payload,
        loading: true
      };
    case LOAD_EDITOR_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        template: action.payload.template,
        publicKey: action.payload.key.publicKey,
        formKey: action.payload.key,
        date: action.payload.date,
        publicUrl: action.payload.url,
        error: false
      };
    case LOAD_EDITOR_PAGE_ERROR:
      return {
        ...state,
        id: state.id,
        loading: false,
        error: action.payload
      };
    case UPDATE_EDITOR_PAGE_FORM_TEMPLATE:
      return {
        ...state,
        template: action.payload
      };
    case UNLOCK_EDITOR_PAGE:
      return {
        ...state,
        unlockingError: false
      }
    case UNLOCK_EDITOR_PAGE_SUCCESS:
      return {
        ...state,
        unlocked: true,
        unlockingError: false,
        privateKey: action.payload
      };
    case UNLOCK_EDITOR_PAGE_ERROR:
      return {
        ...state,
        unlockingError: true
      };
    case SAVE_EDITOR_PAGE:
      return {
        ...state,
        saving: true,
        savingError: false
      };
    case SAVE_EDITOR_PAGE_SUCCESS:
      return {
        ...state,
        saving: false,
        savingError: false
      };
    case SAVE_EDITOR_PAGE_ERROR:
      return {
        ...state,
        saving: false,
        savingError: true
      };
    default:
      return state;
  }
};

const editorPageReducer = mergeReducer(editorPageMainReducer, 'responses', editorPageResponsesReducer);

export type IEditorPageState = ReturnType<typeof editorPageReducer>

export default editorPageReducer;