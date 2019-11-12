import React from 'react';
import FormItem from '../FormItem';
import Legend from '../Legend';
import Description from '../Description';
import { ITextFieldTemplate } from '@interface/Form/TextField';

export interface ITextFieldProps {
  template: ITextFieldTemplate;
}

class TextField extends React.PureComponent<ITextFieldProps> {
  render() {
    const {
      template
    } = this.props;
    const title = template.title &&
      <Legend>
        {template.title}
      </Legend>
    const description = template.description &&
      <Description>{template.description}</Description>;
    return <FormItem component='fieldset'>
      {title}
      {description}
    </FormItem>
  }
}

export default TextField
