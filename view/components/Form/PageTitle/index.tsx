import React from 'react';
import injectSheet, { WithStyles } from 'react-jss'
import Asterisk from 'components/Asterisk';
import FormItem from '../FormItem';
import Legend from '../Legend';
import Description from '../Description';
import { Styles } from 'jss';

export interface IPageTitleProps {
  title?: string;
  description?: string;
  requiredLegend?: boolean;
}

const styles: Styles = {
  title: {
    fontSize: '2.4rem',
    fontWeight: 'normal',
    cursor: 'auto'
  },
  description: {
    marginTop: '22px',
    cursor: 'auto'
  },
  requiredLegend: {
    fontSize: '0.9rem',
    marginTop: '22px',
    cursor: 'auto'
  }
}

class PageTitle extends React.PureComponent<IPageTitleProps & WithStyles<typeof styles>> {
  render() {
    const {
      title,
      description,
      requiredLegend,
      classes
    } = this.props;
    return <FormItem component='header'>
      <Legend className={classes.title}>{title}</Legend>
      {description && <Description className={classes.description}>{description}</Description>}
      {requiredLegend &&
        <p className={classes.requiredLegend}><Asterisk>必填</Asterisk></p>}
    </FormItem>
  }
}

export default injectSheet(styles)(PageTitle)
