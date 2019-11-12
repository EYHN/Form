import { createAction } from "typesafe-actions";
import { LOAD_FORM_RESPONSES, LOAD_FORM_RESPONSES_SUCCESS, LOAD_FORM_RESPONSES_ERROR } from "./constants";
import { IFormTemplate, IFormValue } from "@interface/Form";

export interface IDecryptedResponse {
  id: string;
  formId: string;
  value: IFormValue;
  template: IFormTemplate;
  date: string;
}

export const loadResponses = createAction(LOAD_FORM_RESPONSES, resolve => (id: string) => resolve(id));
export const responsesLoaded = createAction(LOAD_FORM_RESPONSES_SUCCESS, resolve => (data: IDecryptedResponse[]) => resolve(data));
export const responsesLoadingError = createAction(LOAD_FORM_RESPONSES_ERROR, resolve => (error: Error) => resolve(error));
