import { IResponse, IResponseKey } from "@interface/Response";
import { IFormTemplate } from "@interface/Form";

export interface IApiFetchFormResponse {
  responses: IResponse[];
}

export interface IApiNewResponseRequest {
  date: string;
  template: IFormTemplate;
  encryptedData: string;
  key: IResponseKey;
}

export interface IApiNewResponseResponse {
}