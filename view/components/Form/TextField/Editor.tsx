import React from 'react';
import TextArea from '../TextArea';
import Description from '../Description';
import EditorItem from '../EditorItem';
import LegendEditor from '../LegendEditor';
import Delete from 'components/icons/Delete';
import Tooltip from 'components/Tooltip';
import { ITextFieldTemplate } from '@interface/Form/TextField';
import ToolBarIconButton from 'components/ToolBar/ToolBarIconButton';

export interface ITextFieldEditorProps {
  template: ITextFieldTemplate;
  disabled?: boolean;
  onDelete?: () => void;
  onChange?: (value: ITextFieldTemplate) => void;
}

export default class TextFieldEditor extends React.PureComponent<ITextFieldEditorProps> {

  handleTitleChange = (title: string) => {
    if (typeof this.props.onChange !== 'function') return;
    this.props.onChange({
      ...this.props.template,
      title: title
    });
  }

  handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (typeof this.props.onChange !== 'function') return;
    this.props.onChange({
      ...this.props.template,
      description: event.target.value
    });
  }

  handleTypeChange = (type: string) => {
    this.props.onChange({
      ...this.props.template,
      type: type as any
    });
  }

  render() {
    const { template, onDelete, disabled } = this.props;

    return <EditorItem component='fieldset' disabled={disabled} toolbar={<>
      <Tooltip tip='删除' dir='bottom' disabled={disabled}><ToolBarIconButton icon={Delete} onClick={onDelete} disabled={disabled} /></Tooltip>
    </>}>
      <LegendEditor title={template.title} onTitleChange={this.handleTitleChange} type={template.type} disabled={disabled}/>
      <Description>
        <TextArea onChange={this.handleDescriptionChange} placeholder='描述' underScoreColor='#bdbdbd' value={template.description} disabled={disabled} />
      </Description>
    </EditorItem>
  }
}
