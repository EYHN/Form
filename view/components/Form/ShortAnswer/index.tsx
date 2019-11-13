import React from 'react';
import FormItem from '../FormItem';
import Legend from '../Legend';
import TextInput from '../TextInput';
import Description from '../Description';
import { IShortAnswerTemplate } from '@interface/Form/ShortAnswer';
import { IFormItemMeta } from '@interface/Form';
import ErrorMesssage from '../ErrorMesssage';

export interface IShortAnswerProps {
  template: IShortAnswerTemplate;
  disabled?: boolean;
  value?: string;
  meta?: IFormItemMeta;
  onChange?: (value: string) => void;

  /**
   * for calculate the error
   */
  onBlurring?: (value: string) => void;
  /**
   * for clear the error
   */
  onChanging?: (value: string) => void;
}

export default class ShortAnswer extends React.PureComponent<IShortAnswerProps> {
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target
    if (typeof this.props.onChange === 'function')
      this.props.onChange(value);
    if (typeof this.props.onChanging === 'function')
      this.props.onChanging(value);
  }
  
  handleBlur = () => {
    const {onBlurring, value} = this.props;
    if (typeof onBlurring === 'function')
      onBlurring(value);
  }

  render() {
    const {meta = {}} = this.props;
    const title = this.props.template.title &&
      <Legend>{this.props.template.title}</Legend>;
    const description = this.props.template.description &&
      <Description>{this.props.template.description}</Description>;
    
    return <FormItem component='fieldset'>
      {title}
      {description}
      <TextInput disabled={this.props.disabled} inline value={this.props.value} onChange={this.handleChange} onBlur={this.handleBlur}></TextInput>
      {meta.error &&
      <ErrorMesssage>{meta.error}</ErrorMesssage>}
    </FormItem>
  }
}
