import React from 'react';
import injectSheet, { WithStyles } from "react-jss";
import classNames from 'classnames';
import Legend from './Legend';
import TypeSelect from './TypeSelect';
import TextArea from './TextArea';
import { Styles } from 'jss';

const styles: Styles = {
  legend: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    '&>*': {
      marginTop: '5px',
      marginBottom: '5px',
      marginRight: '16px',
    }
  },
  title: {
    flexGrow: 1
  }
}

interface ILegendEditorProps {
  className?: string;
  placeholder?: string;
  title?: string;
  onTitleChange?: (title: string) => void;
  type?: string;
  onTypeChange?: (type: string) => void;
  disabled?: boolean
}

class LegendEditor extends React.PureComponent<ILegendEditorProps & WithStyles<typeof styles>> {
  handleTitleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    if (typeof this.props.onTitleChange !== 'function')return;
    this.props.onTitleChange(event.target.value.split('\n')[0]);
  }
  render() {
    const {classes, className, title, placeholder = '标题', type, onTypeChange, disabled} = this.props;
    return <Legend className={classNames(classes.legend, className)}>
      <TextArea className={classNames(classes.title)} underScoreColor='#bdbdbd' onChange={this.handleTitleChange} placeholder={placeholder} value={title} disabled={disabled} />
      {onTypeChange && <TypeSelect value={type} onChange={onTypeChange} disabled={disabled} />}
    </Legend>
  }
}

export default injectSheet(styles)(LegendEditor)
