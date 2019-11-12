import React from 'react';
import injectSheet, { WithStyles } from "react-jss";
import classNames from 'classnames';
import Checkbox from '../Checkbox';
import Radio from '../Radio';
import TextInput from './TextInput';
import DraggableList from 'components/DraggableList';
import deepEqual from 'deep-equal';
import Hover from 'components/Hover';
import Drag from 'components/icons/Drag';
import Clear from 'components/icons/Clear';
import IconButton from 'components/icons/IconButton';
import { ISingleSelectionChoice } from '@interface/Form/SingleSelection';
import { Styles } from 'jss';

const selectionEditorItemStyles: Styles = {
  selection: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '12px',
    paddingBottom: '12px',
    minHeight: '27px',
    fontSize: '0.95em',
    '&>*': {
      marginLeft: '8px'
    }
  },
  radio: {
    width: '20px',
    height: '20px',
    margin: '0px 4px 0px 0px',
    cursor: 'pointer',
    verticalAlign: 'bottom'
  },
  checkbox: {
    width: '20px',
    height: '20px',
    margin: '0px 4px 0px 0px',
    verticalAlign: 'bottom'
  },
  textInput: {
    flexGrow: 1
  }
}

const styles: Styles = {
  choiceItem: {
    display: 'flex',
    background: 'white',
    alignItems: 'center',
    maxHeight: '100%'
  },
  choiceItemDraggable: {
    marginLeft: '-27px',
    marginRight: '-8px',
    paddingRight: '8px'
  },
  choiceItemDragged: {
    boxShadow: '0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)'
  },
  dragHandle: {
    visibility: 'hidden',
    cursor: 'move',
    marginLeft: '3px',
    width: '24px',
    height: '24px',
    color: '#bdbdbd'
  },
  selection: {
    marginLeft: '6px',
    marginRight: '6px',
    flexGrow: 1
  },
  activeButton: {
    fontSize: '0.95em',
    color: '#003c8f',
    cursor: 'pointer'
  },
  disabledActiveButton: {
    color: '#545454',
    cursor: 'default'
  }
};

interface ISelectionProps {
  className?: string;
  type?: 'radio' | 'checkbox';
  checked?: boolean;
  disabled?: boolean;
  placeholder?: string;
  noTextInput?: boolean;
  textNoUnderScore?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  component?: React.ReactType<{ className: string }>;
  value?: string;
  ref?: React.Ref<any>;
}

const SelectionEditorItem: React.SFC<ISelectionProps & WithStyles<typeof selectionEditorItemStyles>> = (
  {
    classes,
    className,
    value,
    disabled,
    noTextInput,
    checked,
    placeholder,
    textNoUnderScore,
    onChange,
    children,
    component: Component = 'input', type = 'radio'
  }) => (
    <Component className={classNames(classes.selection, className)}>
      {type === 'radio' ?
        <Radio
          disabled={true}
          checked={checked}
          className={classes.radio}
        /> :
        <Checkbox
          disabled={true}
          className={classes.checkbox}
          checked={checked}
        />}
      {!noTextInput && <TextInput
        disabled={disabled}
        placeholder={placeholder}
        className={classes.textInput}
        onChange={onChange}
        noUnderScore={textNoUnderScore}
        underScoreColor='#bdbdbd'
        value={value}
      />}
      {children && <span>{children}</span>}
    </Component>
  );

const ConnectedSelectionEditorItem = injectSheet(selectionEditorItemStyles)(SelectionEditorItem);

interface IDraggableListItemProps {
  item: ISingleSelectionChoice & {identifier: number};
  itemSelected: number;
  dragHandleProps: Object;
  commonProps: {
    onChange: (index: number, text: string) => void;
    onDelete: (index: number) => void;
    classes: Record<string, string>;
    type: 'radio' | 'checkbox';
    disabled: boolean;
  }
}

class DraggableListItem extends React.PureComponent<IDraggableListItemProps> {
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props.commonProps;
    onChange(this.props.item.identifier, event.target.value);
  };
  handleDelete = () => {
    const { onDelete } = this.props.commonProps;
    onDelete(this.props.item.identifier);
  }
  renderBody(hover?: boolean) {
    const { item, dragHandleProps, commonProps } = this.props;
    const { classes, type, disabled } = commonProps;
    return <>
      <Drag className={classes.dragHandle} style={{visibility: hover ? 'visible' : 'hidden'}} {...dragHandleProps} />
      <ConnectedSelectionEditorItem
        className={classes.selection}
        type={type}
        textNoUnderScore={!hover}
        onChange={this.handleChange}
        component='div'
        disabled={item.type !== 'text' || disabled}
        placeholder={item.type === 'text' ? '' : '其他...'}
        value={item.type === 'text' ? item.text : ''}
      />
      <IconButton icon={Clear} color='#bdbdbd' onClick={this.handleDelete} disabled={disabled} />
    </>;
  }
  render() {
    const { itemSelected, commonProps } = this.props;
    const { classes, disabled } = commonProps;
    const dragged = itemSelected !== 0;
    return <Hover
        className={classNames(classes.choiceItem, classes.choiceItemDraggable, dragged && classes.choiceItemDragged)}
        style={{
          opacity: dragged ? 0.7 : 1
        }}
      >
        {(hover) => this.renderBody(!disabled && hover)}
    </Hover>
  }
}

interface ISelectionEditorProps {
  choices?: ISingleSelectionChoice[];
  type?: 'radio' | 'checkbox';
  onChange?: (choices: ISingleSelectionChoice[]) => void;
  disabled?: boolean;
}

function generateIdentifier(choices: ISingleSelectionChoice[]) {
  return choices.map((choice, i) => {
    return {
      ...choice,
      identifier: i
    }
  });
}

function removeIdentifier(choices: (ISingleSelectionChoice & {identifier: number})[]): ISingleSelectionChoice[] {
  return choices.map((choice) => {
    choice = {
      ...choice
    };
    delete choice.identifier;
    return choice;
  });
}

interface ISelectionEditorState {
  prevPropsChoices: ISingleSelectionChoice[];
  choices: (ISingleSelectionChoice & {identifier: number})[];
}

class SelectionEditor extends React.PureComponent<ISelectionEditorProps & WithStyles<typeof styles>, ISelectionEditorState> {
  state = {
    prevPropsChoices: [],
    choices: []
  } as ISelectionEditorState;

  static getDerivedStateFromProps(props: ISelectionEditorProps, state: ISelectionEditorState) {
    if (deepEqual(state.prevPropsChoices, props.choices)) return state;
    const choices = removeIdentifier(state.choices);
    const newChoices = props.choices;
    const same = newChoices.reduce((pre, cur) => {
      return choices.findIndex(value => deepEqual(value, cur)) !== -1 && pre;
    }, true);
    if (same) return {
      ...state,
      prevPropsChoices: props.choices
    };
    return {
      ...state,
      prevPropsChoices: props.choices,
      choices: generateIdentifier(props.choices)
    }
  }

  handleOrderChange = (choices: (ISingleSelectionChoice & {identifier: number})[]) => {
    this.setState({
      choices: choices
    }, () => {
      this.props.onChange(removeIdentifier(this.state.choices));
    });
  }

  handleTextChange = (identifier: number, text: string) => {
    this.setState((oldstate) => {
      const newChoices = oldstate.choices.concat();
      const index = oldstate.choices.findIndex(choice => choice.identifier === identifier);
      if (newChoices[index].type === 'text') {
        newChoices[index] = {
          ...newChoices[index],
          text: text
        } as ISingleSelectionChoice & {identifier: number};
      }
      return {
        ...oldstate,
        choices: newChoices
      };
    }, () => {
      this.props.onChange(removeIdentifier(this.state.choices));
    });
  }

  handleDelete = (identifier: number) => {
    this.setState((oldstate) => {
      const newChoices = oldstate.choices.concat();
      const index = oldstate.choices.findIndex(choice => choice.identifier === identifier);
      newChoices.splice(index, 1);
      return {
        ...oldstate,
        choices: newChoices
      };
    }, () => {
      this.props.onChange(removeIdentifier(this.state.choices));
    });
  }

  handleAddChoice = () => {
    this.setState((oldstate) => {
      const newChoices = oldstate.choices.concat();
      let i = 1;
      while (oldstate.choices.findIndex(choices => choices.type === 'text' && choices.text === '选项 ' + i) !== -1) {
        i++;
      }
      newChoices.push({
        type: 'text',
        text: '选项 ' + i,
        identifier: 1
      });
      return {
        ...oldstate,
        choices: generateIdentifier(newChoices)
      };
    }, () => {
      this.props.onChange(removeIdentifier(this.state.choices));
    });
  }

  handleAddOther = () => {
    this.setState((oldstate) => {
      if (oldstate.choices.findIndex(choices => choices.type === 'other') !== -1) return oldstate;
      const newChoices = oldstate.choices.concat();
      newChoices.push({
        type: 'other',
        identifier: 1
      });
      return {
        ...oldstate,
        choices: generateIdentifier(newChoices)
      };
    }, () => {
      this.props.onChange(removeIdentifier(this.state.choices));
    });
  }

  render() {
    const {classes, type='radio', disabled} = this.props;
    const other = this.state.choices.findIndex(choices => choices.type === 'other') !== -1;
    return <>
      <DraggableList
        itemKey='identifier'
        padding={0}
        list={this.state.choices}
        template={DraggableListItem}
        onMoveEnd={this.handleOrderChange}
        container={() => document.body}
        commonProps={{
          onChange: this.handleTextChange,
          onDelete: this.handleDelete,
          type: type,
          classes: classes,
          disabled: disabled
        }}
      />
      <ConnectedSelectionEditorItem
        className={classes.selection}
        type={type}
        component='div'
        noTextInput
        disabled={true}
      >
        <span className={classNames(classes.activeButton, disabled && classes.disabledActiveButton)} onClick={!disabled ? this.handleAddChoice : null}>添加选项</span>
        {!other && <> 或 <span className={classNames(classes.activeButton, disabled && classes.disabledActiveButton)} onClick={!disabled ? this.handleAddOther : null}>添加“其他”</span></>}
      </ConnectedSelectionEditorItem>
    </>
  }
}

export default injectSheet(styles)(SelectionEditor)