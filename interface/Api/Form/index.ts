import { IFormTemplate, IForm, IFormKey } from "@interface/Form";

export interface IApiUpdateFormRequest {
  template: IFormTemplate;
}

export type IApiUpdateFormResponse = IForm;

export interface IApiNewFormRequest {
  date: string;
  template: IFormTemplate;
  key: IFormKey;
}

export type IApiNewFormResponse = IForm;

export type IApiFetchFormResponse = IForm;