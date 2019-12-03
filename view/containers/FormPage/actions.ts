import { LOAD_FORM_PAGE, LOAD_FORM_PAGE_SUCCESS, LOAD_FORM_PAGE_ERROR, SUBMIT_FORM_PAGE, SUBMIT_FORM_PAGE_SUCCESS, SUBMIT_FORM_PAGE_ERROR, RESET_FORM_PAGE, UNLOAD_FORM_PAGE } from './constants';
import { action } from 'typesafe-actions';
import { IForm, IFormValue } from '@interface/Form';

export const loadFormPage = (id: string) => action(LOAD_FORM_PAGE, id);
export const unloadFormPage = () => action(UNLOAD_FORM_PAGE);
export const formPageLoaded = (form: IForm) => action(LOAD_FORM_PAGE_SUCCESS, form);
export const formPageLoadingError = (error: Error) => action(LOAD_FORM_PAGE_ERROR, error);

export const submitFormPage = (value: IFormValue) => action(SUBMIT_FORM_PAGE, value);
export const formPageSubmited = () => action(SUBMIT_FORM_PAGE_SUCCESS);
export const formPageSubmittingError = (error: Error) => action(SUBMIT_FORM_PAGE_ERROR, error);

export const resetFormPage = () => action(RESET_FORM_PAGE);