import React from 'react';
import FormItem from '../FormItem';
import Legend from '../Legend';
import TextInput from '../TextInput';
import Description from '../Description';
import { IShortAnswerTemplate } from '@interface/Form/ShortAnswer';

export interface IShortAnswerProps {
  template: IShortAnswerTemplate;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export default class ShortAnswer extends React.PureComponent<IShortAnswerProps> {
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target
    this.props.onChange(value);
  }

  render() {
    const title = this.props.template.title &&
      <Legend>{this.props.template.title}</Legend>;
    const description = this.props.template.description &&
      <Description>{this.props.template.description}</Description>;
    
    return <FormItem component='fieldset'>
      {title}
      {description}
      <TextInput disabled={this.props.disabled} inline value={this.props.value} onChange={this.handleChange}></TextInput>
    </FormItem>
  }
}
