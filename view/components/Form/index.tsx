import React from 'react';
import MultiSelection from './MultiSelection';
import SingleSelection from './SingleSelection';
import ShortAnswer from './ShortAnswer';
import TextField from './TextField';
import ImageView from './ImageView';
import PageTitle from './PageTitle';
import { IFormItemTemplate, IFormTemplate, IFormValue, IFormMeta } from '@interface/Form';
import SubmitButton from './SubmitButton';
import FormItem from './FormItem';

export interface IFormProps {
  disabled?: boolean;
  template: IFormTemplate;
  metas?: IFormMeta;
  values: IFormValue;
  submitting?: boolean;
  submitButton?: boolean;
  onChange?: (value: IFormValue) => void;
  onSubmit?: (value: IFormValue) => void;

  /**
   * for calculate the error
   */
  onItemBlurring?: (id: string, value: any) => void;
  /**
   * for clear the error
   */
  onItemChanging?: (id: string, value: any) => void;
}

const FormComponentMap = {
  ShortAnswer: ShortAnswer,
  SingleSelection: SingleSelection,
  MultiSelection: MultiSelection,
  TextField: TextField,
  ImageView: ImageView
}

class Form extends React.PureComponent<IFormProps> {

  handleSubmitButton: React.FormEventHandler = () => {
    if (typeof this.props.onSubmit === 'function') {
      this.props.onSubmit(this.props.values)
    }
  }

  // Disable form submit event, avoid Enter key submitting form.
  handleFormSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
  }

  renderFormItem(template: IFormItemTemplate, index: number) {
    const {values, metas, disabled, onChange, onItemBlurring, onItemChanging} = this.props;
    const id = template.id;
    const value = values && values[id];
    const meta = metas && metas[id];
    const Component = FormComponentMap[template.type] as React.ComponentType<any>;
    return <Component
      disabled={disabled}
      key={index}
      template={template} 
      value={value}
      meta={meta}
      onChange={(value: any) => {
        if (typeof onChange !== 'function') return;
        const newValue = {
          ...values,
          [id]: value
        };
        onChange(newValue);
      }}
      onBlurring={(value: any) => {
        if (typeof onItemBlurring !== 'function') return;
        onItemBlurring(id, value);
      }}
      onChanging={(value: any) => {
        if (typeof onItemChanging !== 'function') return;
        onItemChanging(id, value);
      }}
    />;
  }

  render() {
    const {template, submitting, submitButton = true} = this.props;
    return <form onSubmit={this.handleFormSubmit}>
      <PageTitle title={template.title} description={template.description} requiredLegend={true}></PageTitle>
      {this.props.template.form.map((template, index) => this.renderFormItem(template, index))}
      {submitButton && <FormItem><SubmitButton onClick={this.handleSubmitButton} disabled={submitting}>{submitting ? '提交中...' : '提交'}</SubmitButton></FormItem>}
    </form>
  }
}

export default Form;
