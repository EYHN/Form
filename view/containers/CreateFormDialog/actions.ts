import { action } from 'typesafe-actions';
import { CREATE_NEW_FORM, CREATE_NEW_FORM_ERROR, CREATE_NEW_FORM_SUCCESS, CLEAR_NEW_FORM_STATE } from './constants';
import { IFormTemplate, IForm } from '@interface/Form';

export const clearNewFormState = () => action(CLEAR_NEW_FORM_STATE);

export const createNewForm = (data: {template: IFormTemplate, password: string}) => action(CREATE_NEW_FORM, data);
export const newFormCreated = (data: {form: IForm, privateKey: string, aesKey: string}) => action(CREATE_NEW_FORM_SUCCESS, data);
export const newFormCreatingError = (error: Error) => action(CREATE_NEW_FORM_ERROR, error);
