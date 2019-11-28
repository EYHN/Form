import { createAction } from 'typesafe-actions';
import { CREATE_NEW_FORM, CREATE_NEW_FORM_ERROR, CREATE_NEW_FORM_SUCCESS, CLEAR_NEW_FORM_STATE } from './constants';
import { IFormTemplate, IForm } from '@interface/Form';

export const clearNewFormState = createAction(CLEAR_NEW_FORM_STATE);

export const createNewForm = createAction(CREATE_NEW_FORM, resolve => (data: {template: IFormTemplate, password: string}) => resolve(data));
export const newFormCreated = createAction(CREATE_NEW_FORM_SUCCESS, resolve => (data: {form: IForm, privateKey: string, aesKey: string}) => resolve(data));
export const newFormCreatingError = createAction(CREATE_NEW_FORM_ERROR, resolve => (error: Error) => resolve(error));
