export interface ISingleSelectionTextChoice {
  type: 'text',
  text: string
}

export interface ISingleSelectionOtherChoice {
  type: 'other'
}

export type ISingleSelectionChoice = ISingleSelectionTextChoice | ISingleSelectionOtherChoice;

export interface ISingleSelectionValue {
  otherText?: string;
  choice?: ISingleSelectionChoice;
}

export interface ISingleSelectionTemplate {
  type: 'SingleSelection';
  id: string;
  title?: string;
  description?: string;
  required?: boolean;
  choices: ISingleSelectionChoice[]
}
