import React from 'react';
import MultiSelectionEditor from './MultiSelection/Editor';
import SingleSelectionEditor from './SingleSelection/Editor';
import ShortAnswerEditor from './ShortAnswer/Editor';
import PageTitleEditor from './PageTitle/Editor';
import PageTitle from './PageTitle';
import ShortAnswer from './ShortAnswer';
import SingleSelection from './SingleSelection';
import MultiSelection from './MultiSelection';
import injectSheet, { WithStyles } from 'react-jss';
import DraggableList from 'components/DraggableList';
import Drag from 'components/icons/Drag';
import FloatToolbar from './FloatToolbar';
import Text from 'components/icons/Text';
import IconButton from 'components/icons/IconButton';
import AddCircle from 'components/icons/AddCircle';
import Tooltip from 'components/Tooltip';
import Photo from 'components/icons/Photo';
import TextFieldEditor from './TextField/Editor';
import ImageViewEditor from './ImageView/Editor';
import TextField from './TextField';
import ImageView from './ImageView';
import classNames from 'classnames';
import { Styles } from 'jss';
import { IFormItemTemplate, IFormTemplate } from '@interface/Form';

const FormComponentMap = {
  PageTitle: PageTitle,
  ShortAnswer: ShortAnswer,
  SingleSelection: SingleSelection,
  MultiSelection: MultiSelection,
  TextField: TextField,
  ImageView: ImageView
}

const EditorComponentMap = {
  PageTitle: PageTitleEditor,
  ShortAnswer: ShortAnswerEditor,
  SingleSelection: SingleSelectionEditor,
  MultiSelection: MultiSelectionEditor,
  TextField: TextFieldEditor,
  ImageView: ImageViewEditor
}

interface IDraggableItemProps {
  item: IFormItemTemplate;
  itemSelected: number;
  dragHandleProps: Object;
  commonProps: {
    onChange: (template: IFormItemTemplate, id: string) => void;
    onDelete: (id: string) => void;
    onFocus: (id: string) => void;
    onFocusRef: (element: HTMLElement) => void;
    focus: string,
    classes: Record<string, string>;
    disabled: boolean;
  }
}

const styles: Styles = {
  root: {
    position: 'relative',
  },
  disabledRoot: {
    color: '#545454'
  },
  formItem: {
    marginLeft: '-30px',
    marginRight: '-30px',
    paddingLeft: '30px',
    paddingRight: '30px',
  },
  focus: {
    marginLeft: '-30px',
    marginRight: '-30px',
    paddingLeft: '27px',
    paddingRight: '30px',
    borderLeft: '3px solid #4d90fe',
    background: '#fff'
  },
  disabledFocus: {
    borderLeftColor: '#888',
  },
  focusShadow: {
    boxShadow: '0 -2px 2px 0 rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.3)',
  },
  dragHandle: {
    cursor: 'move',
    textAlign: 'center'
  },
  disabledDragHandle: {
    cursor: 'default',
  },
  dragIcon: {
    color: '#bdbdbd',
    transform: 'rotate(90deg)'
  },
  floatToolbar: {
    position: 'absolute',
    top: '0px',
    right: '-92px'
  },
  floatToolbarIconButton: {
    padding: '6px',
    width: '46px',
    height: '36px'
  }
}

class DraggableItem extends React.PureComponent<IDraggableItemProps> {
  render() {
    const { item: template, commonProps, itemSelected, dragHandleProps } = this.props;
    const { focus, classes, onChange, onDelete, onFocus, onFocusRef, disabled } = commonProps;
    const dragged = itemSelected !== 0;

    if (focus === template.id) {
      const Component = EditorComponentMap[template.type] as React.ComponentType<any>;
      return <div
        className={classNames(classes.formItem, classes.focus, disabled && classes.disabledFocus, classes.focusShadow)}
        style={{
          opacity: dragged ? 0.7 : 1
        }}
        ref={onFocusRef}
      >
        <div className={classNames(classes.dragHandle, disabled && classes.disabledDragHandle)} {...(!disabled && dragHandleProps)}><Drag className={classes.dragIcon} /></div>
        <Component template={template} onChange={(template: IFormItemTemplate) => onChange(template, template.id)} onDelete={() => onDelete(template.id)} disabled={disabled} />
      </div>;
    } else {
      const Component = FormComponentMap[template.type] as React.ComponentType<any>;
      return <div className={classes.formItem} onMouseDown={() => !disabled && onFocus(template.id)}>
        <Component disabled template={template} />
      </div>;
    }
  }
}

interface IEditorProps {
  template: IFormTemplate;
  onChange: (template: IFormTemplate) => void;
  disabled?: boolean;
}

interface IState {
  focus: string,
  focusRef: HTMLElement;
}

class Editor extends React.PureComponent<IEditorProps & WithStyles<typeof styles>, IState> {
  state: IState = {
    focus: this.props.template.form && this.props.template.form.length > 0 ? this.props.template.form[0].id : '',
    focusRef: null
  }

  getNewId = () => {
    const ids = (this.props.template.form || []).map(q => q.id);
    let id = '1';
    while (ids.indexOf(id) !== -1) {
      id = parseInt(id) + 1 + '';
    }
    return id;
  }

  handleOrderChange = (templates: IFormItemTemplate[]) => {
    if (typeof this.props.onChange !== 'function') return;
    this.props.onChange({
      ...this.props.template,
      form: templates
    });
  }

  handleChange = (template: IFormItemTemplate, id: string) => {
    if (typeof this.props.onChange !== 'function') return;
    const index = this.props.template.form.findIndex(template => template.id === id);
    const newForm = this.props.template.form.concat();
    newForm[index] = template;
    this.props.onChange({
      ...this.props.template,
      form: newForm
    });
  }
  
  handleDelete = (id: string) => {
    if (typeof this.props.onChange !== 'function') return;
    const index = this.props.template.form.findIndex(template => template.id === id);
    const newForm = this.props.template.form.concat();
    if (this.state.focus === id && newForm.length > 1) {
      if (newForm.length > index + 1) {
        const newFocus = newForm[index + 1].id;
        this.setState({
          focus: newFocus
        });
      } else {
        const newFocus = newForm[index - 1].id;
        this.setState({
          focus: newFocus
        });
      }
    }
    newForm.splice(index, 1);
    this.props.onChange({
      ...this.props.template,
      form: newForm
    });
  }

  handleFocus = (id: string) => {
    this.setState({
      focus: id
    });
  }

  handleFocusRef = (element: HTMLElement) => {
    this.setState({
      focusRef: element
    });
  }

  injectFormItem = (id: string, template: IFormItemTemplate) => {
    if (typeof this.props.onChange !== 'function') return;
    const index = this.props.template.form.findIndex(template => template.id === id);
    const newForm = this.props.template.form.concat();
    newForm.splice(index + 1, 0, template);
    this.props.onChange({
      ...this.props.template,
      form: newForm
    });
    this.setState({
      focus: template.id
    });
  }

  handleNewQuestion = () => {
    this.injectFormItem(this.state.focus, {
      type: 'SingleSelection',
      id: this.getNewId(),
      title: '新问题',
      choices: [{
        type: 'text',
        text: '选项 1'
      }]
    });
  }

  handleNewTextField = () => {
    this.injectFormItem(this.state.focus, {
      type: 'TextField',
      id: this.getNewId(),
      title: '文字说明'
    });
  }

  handleNewImage = () => {
    this.injectFormItem(this.state.focus, {
      type: 'ImageView',
      id: this.getNewId(),
      title: '新图片标题'
    });
  }

  handleTitleChange = (title: string) => {
    this.props.onChange({
      ...this.props.template,
      title
    });
  }

  handleDescriptionChange = (description: string) => {
    this.props.onChange({
      ...this.props.template,
      description
    });
  }

  renderHeader = () => {
    const { template, classes, disabled } = this.props;
    if (this.state.focus === '__header') {
      return <div
        className={classNames(classes.focus, disabled && classes.disabledFocus)}
        ref={this.handleFocusRef}
      >
        <PageTitleEditor
          title={template.title}
          description={template.description}
          requiredLegend
          onTitleChange={this.handleTitleChange}
          onDescriptionChange={this.handleDescriptionChange}
          disabled={disabled}
        />
      </div>;
    } else {
      return <div onMouseDown={() => !disabled && this.handleFocus('__header')}>
        <PageTitle
          title={template.title}
          description={template.description}
          requiredLegend
        />
      </div>;
    }
  }

  render() {
    const { template, classes, disabled } = this.props;
    
    return <form className={classNames(classes.root, disabled && classes.disabledRoot)}>
      {this.renderHeader()}
      <DraggableList
        itemKey='id'
        padding={0}
        list={template.form}
        template={DraggableItem}
        onMoveEnd={this.handleOrderChange}
        container={() => document.body}
        commonProps={{
          focus: this.state.focus,
          onChange: this.handleChange,
          onDelete: this.handleDelete,
          onFocus: this.handleFocus,
          onFocusRef: this.handleFocusRef,
          classes: classes,
          disabled: disabled
        }}
      />
      <FloatToolbar className={classes.floatToolbar} targetElement={this.state.focusRef}>
        <Tooltip tip='添加问题' dir='right' disabled={disabled}><IconButton icon={AddCircle} className={classes.floatToolbarIconButton} onClick={this.handleNewQuestion} disabled={disabled} /></Tooltip>
        <Tooltip tip='添加文字' dir='right' disabled={disabled}><IconButton icon={Text} className={classes.floatToolbarIconButton} onClick={this.handleNewTextField} disabled={disabled} /></Tooltip>
        <Tooltip tip='添加图片' dir='right' disabled={disabled}><IconButton icon={Photo} className={classes.floatToolbarIconButton} onClick={this.handleNewImage} disabled={disabled} /></Tooltip>
      </FloatToolbar>
    </form>
  }
}

export default injectSheet(styles)(Editor)
