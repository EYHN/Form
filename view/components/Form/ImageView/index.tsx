import React from 'react';
import FormItem from '../FormItem';
import Legend from '../Legend';
import { IImageViewTemplate } from '@interface/Form/ImageView';
import { IFormComponentProps } from '..';

export interface IImageViewProps extends IFormComponentProps {
  template: IImageViewTemplate;
}

class ImageView extends React.PureComponent<IImageViewProps> {
  render() {
    const {
      template
    } = this.props;
    const title = template.title &&
      <Legend>
        {template.title}
      </Legend>
    return <FormItem component='fieldset'>
      {title}
      <img src={template.url} style={{width: '100%'}}></img>
    </FormItem>
  }
}

export default ImageView
