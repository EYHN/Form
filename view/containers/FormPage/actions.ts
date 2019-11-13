import { LOAD_FORM_PAGE, LOAD_FORM_PAGE_SUCCESS, LOAD_FORM_PAGE_ERROR, SUBMIT_FORM_PAGE, SUBMIT_FORM_PAGE_SUCCESS, SUBMIT_FORM_PAGE_ERROR, RESET_FORM_PAGE } from './constants';
import { createAction } from 'typesafe-actions';
import { IForm, IFormValue } from '@interface/Form';

export const loadFormPage = createAction(LOAD_FORM_PAGE, resolve => (id: string) => resolve(id));
export const formPageLoaded = createAction(LOAD_FORM_PAGE_SUCCESS, resolve => (form: IForm) => resolve(form));
export const formPageLoadingError = createAction(LOAD_FORM_PAGE_ERROR, resolve => (error: Error) => resolve(error));

export const submitFormPage = createAction(SUBMIT_FORM_PAGE, resolve => (value: IFormValue) => resolve(value));
export const formPageSubmited = createAction(SUBMIT_FORM_PAGE_SUCCESS);
export const formPageSubmittingError = createAction(SUBMIT_FORM_PAGE_ERROR, resolve => (error: Error) => resolve(error));

export const resetFormPage = createAction(RESET_FORM_PAGE);