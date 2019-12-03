import { LOAD_EDITOR_PAGE, LOAD_EDITOR_PAGE_SUCCESS, LOAD_EDITOR_PAGE_ERROR, UNLOCK_EDITOR_PAGE, UPDATE_EDITOR_PAGE_FORM_TEMPLATE, SAVE_EDITOR_PAGE, SAVE_EDITOR_PAGE_SUCCESS, SAVE_EDITOR_PAGE_ERROR, UNLOCK_EDITOR_PAGE_SUCCESS, UNLOCK_EDITOR_PAGE_ERROR } from './constants';
import { action } from 'typesafe-actions';
import { IFormTemplate, IForm } from '@interface/Form';

export const loadEditorPage = (id: string) => action(LOAD_EDITOR_PAGE, id);
export const editorPageLoaded = (data: IForm) => action(LOAD_EDITOR_PAGE_SUCCESS, data);
export const editorPageLoadingError = (error: Error) => action(LOAD_EDITOR_PAGE_ERROR, error);

export const updateEditorPageFormTemplate = (template: IFormTemplate) => action(UPDATE_EDITOR_PAGE_FORM_TEMPLATE, template);

export const unlockEditorPage = (password: string) => action(UNLOCK_EDITOR_PAGE, password);
export const editorPageUnlocked = (key: {privateKey: string, aesKey: string}) => action(UNLOCK_EDITOR_PAGE_SUCCESS, key);
export const editorPageUnlockingError = (error: Error) => action(UNLOCK_EDITOR_PAGE_ERROR, error);

export const saveEditorPage = () => action(SAVE_EDITOR_PAGE);
export const editorPageSaved = (data: IForm) => action(SAVE_EDITOR_PAGE_SUCCESS, data);
export const editorPageSavingError = (error: Error) => action(SAVE_EDITOR_PAGE_ERROR, error);
