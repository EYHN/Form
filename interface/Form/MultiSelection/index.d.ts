export interface IMultiSelectionTextChoice {
  type: 'text',
  text: string
}

export interface IMultiSelectionOtherChoice {
  type: 'other'
}

export type IMultiSelectionChoice = IMultiSelectionTextChoice | IMultiSelectionOtherChoice;

export interface IMultiSelectionValue {
  otherText?: string;
  choices?: IMultiSelectionChoice[];
}

export interface IMultiSelectionTemplate {
  type: 'MultiSelection';
  id: string;
  title?: string;
  description?: string;
  required?: boolean;
  choices: IMultiSelectionChoice[];
}
