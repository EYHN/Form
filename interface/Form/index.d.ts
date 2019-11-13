import { IShortAnswerTemplate } from "./ShortAnswer";
import { IMultiSelectionTemplate, IMultiSelectionValue } from "./MultiSelection";
import { ISingleSelectionTemplate, ISingleSelectionValue } from "./SingleSelection";
import { ITextFieldTemplate } from "./TextField";
import { IImageViewTemplate } from "./ImageView";

export type IFormItemTemplate = (IShortAnswerTemplate | ISingleSelectionTemplate | IMultiSelectionTemplate | ITextFieldTemplate | IImageViewTemplate);

export interface ITemplateMap {
  'ShortAnswer': IShortAnswerTemplate;
  'SingleSelection': ISingleSelectionTemplate;
  'MultiSelection': IMultiSelectionTemplate;
  'TextField': ITextFieldTemplate;
  'ImageView': IImageViewTemplate;
}

export interface IFormTemplate {
  version?: string;
  title: string;
  description?: string;
  form: IFormItemTemplate[];
}

/**
 * Parameters for form components to display special effects.
 */
export interface IFormItemMeta {

  /**
   * computed error message
   */
  error?: string;
}

export interface IFormMeta {
  [id: string]: IFormItemMeta
}

export interface IFormValue {
  [id: string]: ({} | string | ISingleSelectionValue | IMultiSelectionValue)
}

export interface IFormKey {
  publicKey: string;
  encryptedPrivateKey: string;
  privateKeyMac: string;
}

export interface IForm {
  url: string;
  id: string;
  key: IFormKey;
  date: string;
  template: IFormTemplate;
}
