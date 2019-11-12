import React from 'react';
import LegendEditor from '../LegendEditor';
import Description from '../Description';
import TextArea from '../TextArea';
import SelectionEditor from '../SelectionEditor';
import EditorItem, { EditorItemToolbarSeparator } from '../EditorItem';
import IconButton from 'components/icons/IconButton';
import Delete from 'components/icons/Delete';
import Switch from 'components/Switch';
import Tooltip from 'components/Tooltip';
import { IMultiSelectionTemplate, IMultiSelectionChoice } from '@interface/Form/MultiSelection';

export interface IMultiSelectionEditorProps {
  template: IMultiSelectionTemplate;
  onDelete?: () => void;
  onChange?: (value: IMultiSelectionTemplate) => void;
  disabled?: boolean;
}

class MultiSelectionEditor extends React.PureComponent<IMultiSelectionEditorProps> {
  handleChoicesChange = (choices: IMultiSelectionChoice[]) => {
    if (typeof this.props.onChange !== 'function') return;
    this.props.onChange({
      ...this.props.template,
      choices: choices
    });
  }

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

  handleRequiredChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof this.props.onChange !== 'function') return;
    this.props.onChange({
      ...this.props.template,
      required: event.target.checked
    });
  }

  render() {
    const { template, onDelete, disabled } = this.props;
    return <EditorItem component='fieldset' disabled={disabled} toolbar={<>
      <div>
        必填&nbsp;&nbsp;&nbsp;<Switch checked={template.required} onChange={this.handleRequiredChange} disabled={disabled} />
      </div>
      <EditorItemToolbarSeparator />
      <Tooltip tip='删除' dir='bottom' disabled={disabled}><IconButton icon={Delete} onClick={onDelete} disabled={disabled} /></Tooltip>
    </>}>
      <LegendEditor title={template.title} onTitleChange={this.handleTitleChange} type={template.type} onTypeChange={this.handleTypeChange} disabled={disabled} />
      <Description>
        <TextArea onChange={this.handleDescriptionChange} placeholder='描述' underScoreColor='#bdbdbd' value={template.description} disabled={disabled} />
      </Description>
      <SelectionEditor
        choices={template.choices}
        onChange={this.handleChoicesChange}
        type='checkbox'
        disabled={disabled}
      />
    </EditorItem>
  }
}

export default MultiSelectionEditor
