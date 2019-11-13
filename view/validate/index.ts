import { IFormItemTemplate } from "@interface/Form";
import { IMultiSelectionTemplate, IMultiSelectionValue } from "@interface/Form/MultiSelection";
import { ISingleSelectionValue, ISingleSelectionTemplate } from "@interface/Form/SingleSelection";
import { IShortAnswerTemplate } from "@interface/Form/ShortAnswer";

function MultiSelectionValidate(template: IMultiSelectionTemplate, value: IMultiSelectionValue) {
  if (template.required) {
    return (!value || !value.choices) ? '此问题必须填写。' : null;
  }
}

function SingleSelectionValidate(template: ISingleSelectionTemplate, value: ISingleSelectionValue) {
  if (template.required) {
    return (!value || !value.choice) ? '此问题必须填写。' : null;
  }
}

function ShortAnswerValidate(template: IShortAnswerTemplate, value: string) {
  if (template.required) {
    return (!value) ? '此问题必须填写。' : null;
  }
}

export function validate(template: IFormItemTemplate, value: any): string {
  switch (template.type) {
    case 'MultiSelection':
      return MultiSelectionValidate(template, value);
    case 'SingleSelection':
      return SingleSelectionValidate(template, value);
    case 'ShortAnswer':
      return ShortAnswerValidate(template, value);
    default:
      return;
  }
}
