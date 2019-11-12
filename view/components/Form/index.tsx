import React from 'react';
import MultiSelection from './MultiSelection';
import SingleSelection from './SingleSelection';
import ShortAnswer from './ShortAnswer';
import TextField from './TextField';
import ImageView from './ImageView';
import PageTitle from './PageTitle';
import { IFormItemTemplate, IFormTemplate, IFormValue } from '@interface/Form';
import SubmitButton from './SubmitButton';
import FormItem from './FormItem';

export interface IFormProps {
  disabled?: boolean;
  template: IFormTemplate;
  value: IFormValue;
  submiting?: boolean;
  submitButton?: boolean;
  onChange?: (value: IFormValue) => void;
  onSubmit?: (value: IFormValue) => void;
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
      this.props.onSubmit(this.props.value)
    }
  }

  // Disable form submit event, avoid Enter key submitting form.
  handleFormSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
  }

  renderFormItem(template: IFormItemTemplate, index: number) {
    const value = this.props.value[template.id];
    const Component = FormComponentMap[template.type] as React.ComponentType<any>;
    const onChange = (value: any) => {
      if (typeof this.props.onChange !== 'function') return;
      const newValue = {
        ...this.props.value,
        [template.id]: value
      };
      this.props.onChange(newValue);
    };
    return <Component disabled={this.props.disabled} key={index} template={template} value={value} onChange={onChange}/>;
  }

  render() {
    const {template, submiting, submitButton = true} = this.props;
    return <form onSubmit={this.handleFormSubmit}>
      <PageTitle title={template.title} description={template.description} requiredLegend={true}></PageTitle>
      {this.props.template.form.map((template, index) => this.renderFormItem(template, index))}
      {submitButton && <FormItem><SubmitButton onClick={this.handleSubmitButton}>{submiting ? '提交中...' : '提交'}</SubmitButton></FormItem>}
    </form>
  }
}

export default Form;
