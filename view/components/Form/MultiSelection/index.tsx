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
import { IFormItemMeta } from '@interface/Form';
import ErrorMesssage from '../ErrorMesssage';
import { IFormComponentProps } from '..';

export interface IMultiSelectionProps extends IFormComponentProps {
  id: string;
  template: IMultiSelectionTemplate;
  value?: IMultiSelectionValue;
  meta?: IFormItemMeta;
  disabled?: boolean;
  onChange?: (id: string, value: IMultiSelectionValue) => void;

  /**
   * for calculate the error
   */
  onBlurring?: (id: string, value: IMultiSelectionValue) => void;
  /**
   * for clear the error
   */
  onChanging?: (id: string, value: IMultiSelectionValue) => void;
}

const styles: Styles = {
}

class MultiSelection extends React.PureComponent<IMultiSelectionProps & WithStyles<typeof styles>> {
  otherTextInput: HTMLInputElement;

  handleOtherTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {id, value = {}, onChange, onChanging} = this.props;
    
    const newChoices = value.choices ? value.choices.filter(choice => choice.type !== 'other') : [];
    newChoices.push({
      type: 'other'
    });
    const newvalue: IMultiSelectionValue = {
      ...this.props.value,
      otherText: event.target.value,
      choices: newChoices
    };
    if (typeof onChange === 'function')
      onChange(id, newvalue);
    if (typeof onChanging === 'function')
      onChanging(id, newvalue);
  }

  handleOtherTextBlur = () => {
    const {id, onBlurring, value} = this.props;
    if (typeof onBlurring === 'function')
      onBlurring(id, value);
  }

  select = (choice: IMultiSelectionChoice) => {
    const {id, value = {}, onChange, onBlurring, onChanging} = this.props;
    
    const newChoices = value.choices ? value.choices.filter(value => !deepEqual(value, choice)) : [];
    newChoices.push(choice);
    if (choice.type === 'other' && this.otherTextInput) {
      this.otherTextInput.focus();
    }

    const newValue = {
      ...value,
      choices: newChoices
    };
    if (typeof onChanging === 'function')
      onChanging(id, newValue);
    if (typeof onChange === 'function')
      onChange(id, newValue);
    if (typeof onChange === 'function')
      onBlurring(id, newValue);
  }

  unselect = (choice: IMultiSelectionChoice) => {
    const {id, value = {}, onChange, onBlurring, onChanging} = this.props;

    const newChoices = value.choices ? value.choices.filter(value => !deepEqual(value, choice)) : [];
    const newValue = {
      ...value,
      choices: newChoices
    }

    if (typeof onChanging === 'function')
      onChanging(id, newValue);
    if (typeof onChange === 'function')
      onChange(id, newValue);
    if (typeof onBlurring === 'function')
      onBlurring(id, newValue);
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

export default injectSheet(styles)(MultiSelection)
