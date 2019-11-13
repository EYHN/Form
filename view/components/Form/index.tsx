import React from 'react';
import MultiSelection from './MultiSelection';
import SingleSelection from './SingleSelection';
import ShortAnswer from './ShortAnswer';
import TextField from './TextField';
import ImageView from './ImageView';
import PageTitle from './PageTitle';
import { IFormItemTemplate, IFormTemplate, IFormValue, IFormMeta, IFormItemMeta } from '@interface/Form';
import SubmitButton from './SubmitButton';
import FormItem from './FormItem';

export interface IFormComponentProps {
  id: string;
  template: IFormItemTemplate;
  disabled?: boolean;
  value?: any;
  meta?: IFormItemMeta;

  // For performance, each callback function has an id argument
  /**
   * for calculate the error
   */
  onChange?: (id: string, value: any) => void;
  /**
   * for calculate the error
   */
  onBlurring?: (id: string, value: any) => void;
  /**
   * for clear the error
   */
  onChanging?: (id: string, value: any) => void;
}

export interface IFormProps {
  disabled?: boolean;
  template: IFormTemplate;
  metas?: IFormMeta;
  values: IFormValue;
  submitting?: boolean;
  submitButton?: boolean;
  onSubmit?: (value: IFormValue) => void;

  onItemChange?: (id: string, value: any) => void;
  /**
   * for calculate the error
   */
  onItemBlurring?: (id: string, value: any) => void;
  /**
   * for clear the error
   */
  onItemChanging?: (id: string, value: any) => void;
}

const FormComponentMap: {[name: string]: React.ComponentType<IFormComponentProps>} = {
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
    const {values, metas, disabled, onItemChange, onItemBlurring, onItemChanging} = this.props;
    const id = template.id;
    const value = values && values[id];
    const meta = metas && metas[id];
    const Component = FormComponentMap[template.type];
    return <Component
      id={id}
      disabled={disabled}
      key={index}
      template={template} 
      value={value}
      meta={meta}
      onChange={onItemChange}
      onBlurring={onItemBlurring}
      onChanging={onItemChanging}
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
