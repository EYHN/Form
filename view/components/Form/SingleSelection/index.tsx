import React from 'react';
import Asterisk from 'components/Asterisk';
import deepEqual from 'deep-equal';
import FormItem from '../FormItem';
import Legend from '../Legend';
import Selection from '../Selection';
import Description from '../Description';
import { ISingleSelectionTemplate, ISingleSelectionValue, ISingleSelectionChoice } from '@interface/Form/SingleSelection';
import ErrorMesssage from '../ErrorMesssage';
import { IFormItemMeta } from '@interface/Form';

export interface ISingleSelectionProps {
  template: ISingleSelectionTemplate;
  disabled?: boolean;
  value?: ISingleSelectionValue;
  meta?: IFormItemMeta;
  onChange?: (value: ISingleSelectionValue) => void;
  
  /**
   * for calculate the error
   */
  onBlurring?: (value: ISingleSelectionValue) => void;
  /**
   * for clear the error
   */
  onChanging?: (value: ISingleSelectionValue) => void;
}

class SingleSelection extends React.PureComponent<ISingleSelectionProps> {
  otherTextInput: HTMLInputElement;

  handleOtherTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value, onChange, onChanging} = this.props;
    
    const newvalue: ISingleSelectionValue = {
      ...value,
      otherText: event.target.value,
      choice: {
        type: 'other'
      }
    };
    if (typeof onChange === 'function')
      onChange(newvalue);
    if (typeof onChanging === 'function')
      onChanging(newvalue);
  }

  handleOtherTextBlur = () => {
    const {onBlurring, value} = this.props;
    if (typeof onBlurring === 'function')
      onBlurring(value);
  }

  select = (choice: ISingleSelectionChoice) => {
    const {value, onChange, onBlurring, onChanging} = this.props;
    if (choice.type === 'other' && this.otherTextInput) {
      this.otherTextInput.focus();
    }
    const newValue = {
      ...value,
      choice: choice
    };
    if (typeof onChanging === 'function')
      onChanging(newValue);
    if (typeof onChange === 'function')
      onChange(newValue);
    if (typeof onChange === 'function')
      onBlurring(newValue);
  }

  renderChoice = (choice: ISingleSelectionChoice) => {
    const value = this.props.value || {};
    const checked = deepEqual(choice, value.choice);
    const onClick = () => {
      this.select(choice);
    }
    if (choice.type === 'text') {
      return <Selection
        key={choice.text}
        type='radio'
        onClick={onClick}
        checked={checked}
        component='li'
        disabled={this.props.disabled}
      >
        {choice.text}
      </Selection>
    }
    if (choice.type === 'other') {
      return <Selection
        key='other'
        type='radio'
        onClick={onClick}
        checked={checked}
        component='li'
        textInput
        textValue={value.otherText}
        onTextChange={this.handleOtherTextChange}
        onTextBlur={this.handleOtherTextBlur}
        disabled={this.props.disabled}
      >
        其他
      </Selection>
    }
  }

  render() {
    const {meta = {}} = this.props;
    const title = this.props.template.title &&
      <Legend>
        {this.props.template.title}
        {this.props.template.required === true && <Asterisk />}
      </Legend>
    const description = this.props.template.description &&
      <Description>{this.props.template.description}</Description>;
    return <FormItem component='fieldset'>
      {title}
      {description}
      <ul>
        {this.props.template.choices.map(this.renderChoice)}
      </ul>
      {meta.error &&
      <ErrorMesssage>{meta.error}</ErrorMesssage>}
    </FormItem>
  }
}

export default SingleSelection;
