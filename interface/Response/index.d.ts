import { IFormTemplate } from "@interface/Form";

export interface IResponseKey {
  encryptedKey: string;
  keyMac: string;
}

export interface IResponse {
  id: string;
  formId: string;
  date: string;
  template: IFormTemplate;
  encryptedData: string;
  key: IResponseKey;
}
