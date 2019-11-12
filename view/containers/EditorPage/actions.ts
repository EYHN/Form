import { LOAD_EDITOR_PAGE, LOAD_EDITOR_PAGE_SUCCESS, LOAD_EDITOR_PAGE_ERROR, UNLOCK_EDITOR_PAGE, UPDATE_EDITOR_PAGE_FORM_TEMPLATE, SAVE_EDITOR_PAGE, SAVE_EDITOR_PAGE_SUCCESS, SAVE_EDITOR_PAGE_ERROR, UNLOCK_EDITOR_PAGE_SUCCESS, UNLOCK_EDITOR_PAGE_ERROR } from './constants';
import { createAction } from 'typesafe-actions';
import { IFormTemplate, IForm } from '@interface/Form';

export const loadEditorPage = createAction(LOAD_EDITOR_PAGE, resolve => (id: string) => resolve(id));
export const editorPageLoaded = createAction(LOAD_EDITOR_PAGE_SUCCESS, resolve => (data: IForm) => resolve(data));
export const editorPageLoadingError = createAction(LOAD_EDITOR_PAGE_ERROR, resolve => (error: Error) => resolve(error));

export const updateEditorPageFormTemplate = createAction(UPDATE_EDITOR_PAGE_FORM_TEMPLATE, resolve => (template: IFormTemplate) => resolve(template));

export const unlockEditorPage = createAction(UNLOCK_EDITOR_PAGE, resolve => (password: string) => resolve(password));
export const editorPageUnlocked = createAction(UNLOCK_EDITOR_PAGE_SUCCESS, resolve => (privateKey: string) => resolve(privateKey));
export const editorPageUnlockingError = createAction(UNLOCK_EDITOR_PAGE_ERROR, resolve => (error: Error) => resolve(error));

export const saveEditorPage = createAction(SAVE_EDITOR_PAGE);
export const editorPageSaved = createAction(SAVE_EDITOR_PAGE_SUCCESS);
export const editorPageSavingError = createAction(SAVE_EDITOR_PAGE_ERROR, resolve => (error: Error) => resolve(error));
