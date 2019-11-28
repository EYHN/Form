import React from 'react';
import LegendEditor from '../LegendEditor';
import Description from '../Description';
import TextArea from '../TextArea';
import SelectionEditor from '../SelectionEditor';
import EditorItem from '../EditorItem';
import Delete from 'components/icons/Delete';
import Switch from 'components/Switch';
import Tooltip from 'components/Tooltip';
import { ISingleSelectionTemplate, ISingleSelectionChoice } from '@interface/Form/SingleSelection';
import ToolBarSeparator from 'components/ToolBar/ToolBarSeparator';
import ToolBarText from 'components/ToolBar/ToolBarText';
import ToolBarIconButton from 'components/ToolBar/ToolBarIconButton';

export interface ISingleSelectionEditorProps {
  template: ISingleSelectionTemplate;
  onDelete?: () => void;
  onChange?: (value: ISingleSelectionTemplate) => void;
  disabled?: boolean;
}

class SingleSelectionEditor extends React.PureComponent<ISingleSelectionEditorProps> {
  handleChoicesChange = (choices: ISingleSelectionChoice[]) => {
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
        <ToolBarText>
          必填&nbsp;&nbsp;&nbsp;<Switch checked={template.required} onChange={this.handleRequiredChange} disabled={disabled} />
        </ToolBarText>
        <ToolBarSeparator />
        <Tooltip tip='删除' dir='bottom' disabled={disabled}><ToolBarIconButton icon={Delete} onClick={onDelete} disabled={disabled} /></Tooltip>
      </>}>
      <LegendEditor title={template.title} onTitleChange={this.handleTitleChange} type={template.type} onTypeChange={this.handleTypeChange} disabled={disabled} />
      <Description>
        <TextArea onChange={this.handleDescriptionChange} placeholder='描述' underScoreColor='#bdbdbd' value={template.description} disabled={disabled} />
      </Description>
      <SelectionEditor
        choices={template.choices}
        onChange={this.handleChoicesChange}
        type='radio'
        disabled={disabled}
      />
    </EditorItem>
  }
}

export default SingleSelectionEditor
