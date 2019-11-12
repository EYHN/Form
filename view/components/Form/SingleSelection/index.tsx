import React from 'react';
import Asterisk from 'components/Asterisk';
import deepEqual from 'deep-equal';
import FormItem from '../FormItem';
import Legend from '../Legend';
import Selection from '../Selection';
import Description from '../Description';
import { ISingleSelectionTemplate, ISingleSelectionValue, ISingleSelectionChoice } from '@interface/Form/SingleSelection';

export interface ISingleSelectionProps {
  template: ISingleSelectionTemplate;
  disabled?: boolean;
  value?: ISingleSelectionValue;
  onChange?: (value: ISingleSelectionValue) => void;
}

class SingleSelection extends React.PureComponent<ISingleSelectionProps> {
  otherTextInput: HTMLInputElement;

  handleOtherTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof this.props.onChange !== 'function') return;
    this.props.onChange({
      ...this.props.value,
      otherText: event.target.value,
      choice: {
        type: 'other'
      }
    });
  }

  select = (choice: ISingleSelectionChoice) => {
    if (typeof this.props.onChange !== 'function') return;
    if (choice.type === 'other' && this.otherTextInput) {
      this.otherTextInput.focus();
    }
    this.props.onChange({
      ...this.props.value,
      choice: choice
    });
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
        disabled={this.props.disabled}
      >
        其他
      </Selection>
    }
  }

  render() {
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
    </FormItem>
  }
}

export default SingleSelection;
