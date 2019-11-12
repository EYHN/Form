import React from 'react';
import injectSheet, { WithStyles } from 'react-jss'
import Asterisk from 'components/Asterisk';
import deepEqual from 'deep-equal';
import FormItem from 'components/Form/FormItem';
import Selection from 'components/Form/Selection';
import Description from '../Description';
import Legend from '../Legend';
import { Styles } from 'jss';
import { IMultiSelectionTemplate, IMultiSelectionValue, IMultiSelectionChoice } from '@interface/Form/MultiSelection';

export interface IMultiSelectionProps {
  template: IMultiSelectionTemplate;
  value?: IMultiSelectionValue;
  disabled?: boolean;
  onChange?: (value: IMultiSelectionValue) => void;
}

const styles: Styles = {
}

class MultiSelection extends React.PureComponent<IMultiSelectionProps & WithStyles<typeof styles>> {
  otherTextInput: HTMLInputElement;

  handleOtherTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof this.props.onChange !== 'function') return;
    const value = this.props.value || {};
    const newChoices = value.choices ? value.choices.filter(choice => choice.type !== 'other') : [];
    newChoices.push({
      type: 'other'
    });
    this.props.onChange({
      ...this.props.value,
      otherText: event.target.value,
      choices: newChoices
    });
  }

  select = (choice: IMultiSelectionChoice) => {
    if (typeof this.props.onChange !== 'function') return;
    const value = this.props.value || {};
    const newChoices = value.choices ? value.choices.filter(value => !deepEqual(value, choice)) : [];
    newChoices.push(choice);
    if (choice.type === 'other' && this.otherTextInput) {
      this.otherTextInput.focus();
    }
    this.props.onChange({
      ...this.props.value,
      choices: newChoices
    });
  }

  unselect = (choice: IMultiSelectionChoice) => {
    if (typeof this.props.onChange !== 'function') return;
    const value = this.props.value || {};
    const newChoices = value.choices ? value.choices.filter(value => !deepEqual(value, choice)) : [];
    this.props.onChange({
      ...this.props.value,
      choices: newChoices
    });
  }

  renderChoice = (choice: IMultiSelectionChoice) => {
    const value = this.props.value || {};
    const checked = !!(value.choices && value.choices.find(value => deepEqual(value, choice)));
    const onClick = () => {
      if (!checked)
        this.select(choice);
      else
        this.unselect(choice);
    }
    if (choice.type === 'text') {
      return <Selection
        key={choice.text}
        type='checkbox'
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
        type='checkbox'
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

export default injectSheet(styles)(MultiSelection)
