import { action } from "typesafe-actions";
import { LOAD_FORM_RESPONSES, LOAD_FORM_RESPONSES_SUCCESS, LOAD_FORM_RESPONSES_ERROR } from "./constants";
import { IFormTemplate, IFormValue } from "@interface/Form";

export interface IDecryptedResponse {
  id: string;
  formId: string;
  value: IFormValue;
  template: IFormTemplate;
  date: string;
}

export const loadResponses = (id: string) => action(LOAD_FORM_RESPONSES, id);
export const responsesLoaded = (data: IDecryptedResponse[]) => action(LOAD_FORM_RESPONSES_SUCCESS, data);
export const responsesLoadingError = (error: Error) => action(LOAD_FORM_RESPONSES_ERROR, error);
