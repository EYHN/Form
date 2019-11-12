import React from 'react';
import injectSheet, { WithStyles } from 'react-jss'
import Asterisk from 'components/Asterisk';
import TextArea from '../TextArea';
import EditorItem from '../EditorItem';
import LegendEditor from '../LegendEditor';
import Description from '../Description';
import { Styles } from 'jss';

export interface IPageTitleProps {
  title?: string;
  description?: string;
  requiredLegend?: boolean;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  disabled?: boolean;
}

const styles: Styles = {
  title: {
    fontSize: '2.4rem',
    fontWeight: 'normal'
  },
  description: {
    marginTop: '22px'
  },
  requiredLegend: {
    fontSize: '0.9rem',
    marginTop: '22px'
  }
}

class PageTitleEditor extends React.PureComponent<IPageTitleProps & WithStyles<typeof styles>> {

  handleTitleChange = (title: string) => {
    if (typeof this.props.onTitleChange !== 'function') return;
    this.props.onTitleChange(title);
  }

  handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (typeof this.props.onDescriptionChange !== 'function') return;
    this.props.onDescriptionChange(event.target.value);
  }

  render() {
    const {
      title,
      description,
      requiredLegend,
      classes,
      disabled
    } = this.props;
    return <EditorItem component='header' disabled={disabled}>
      <LegendEditor className={classes.title} title={title} onTitleChange={this.handleTitleChange} disabled={disabled}/>
      <Description>
        <TextArea className={classes.description} onChange={this.handleDescriptionChange} underScoreColor='#bdbdbd' placeholder='表单描述' value={description} disabled={disabled} />
      </Description>
      {requiredLegend &&
        <p className={classes.requiredLegend}><Asterisk>必填</Asterisk></p>}
    </EditorItem>
  }
}

export default injectSheet(styles)(PageTitleEditor)
