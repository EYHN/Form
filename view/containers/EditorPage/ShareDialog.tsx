import React from "react";
import injectSheet, { WithStyles } from "react-jss";
import ResponsivePanel from "components/ResponsivePanel";
import { Styles } from "jss";
import TextInput from "components/Form/TextInput";
import Tabs from "components/Tabs";
import { makeSelectEditorPagePublicUrl, makeSelectEditorPageFormTemplate } from "./selectors";
import { createSelector } from "reselect";
import { $Call } from "utils/types";
import { connect } from "react-redux";

const styles: Styles = {
  section: {
    margin: '12px 24px'
  },
  sectionHeader: {
    marginTop: '6px',
    marginBottom: '8px',
    fontSize: '1.2rem',
    fontWeight: '400'
  },
  inputlabel: {
    marginTop: '6px',
    marginBottom: '8px',
    fontSize: '0.87rem',
    fontWeight: '600',
    color: '#666'
  },
  textInput: {
  },
  tab: {
    display: 'inline-block',
    marginTop: '24px'
  },
  tablabel: {
    padding: '0 16px 0 0',
    fontSize: '0.9rem',
    fontWeight: '600'
  },
  tabbody: {
    background: '#fafafa',
    margin: '0 -24px -24px',
    padding: '16px 24px 48px',
    borderTop: '1px solid #e0e0e0'
  }
};

interface IShareDialogState {
  currentTabName: string;

  // Email share
  emailAddress: string;
  emailTitle: string;
  emailMessage: string;
}

const mapStateToProps = createSelector(
  makeSelectEditorPagePublicUrl(),
  makeSelectEditorPageFormTemplate(),
  (publicUrl, template) => ({ publicUrl, template })
);

interface IShareDialogProps {
  onClose?: () => void;
}

type stateProps = $Call<typeof mapStateToProps>;

type IProps = stateProps & IShareDialogProps & WithStyles<typeof styles>;


class ShareDialog extends React.PureComponent<IProps, IShareDialogState> {
  state = {
    currentTabName: '邮件',
    emailAddress: '',
    emailTitle: '',
    emailMessage: ''
  };
  
  handleTabChange = (tabname: string) => {
    this.setState({
      currentTabName: tabname
    });
  }

  handleEmailAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      emailAddress: event.target.value
    });
  }

  handleEmailTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      emailTitle: event.target.value
    });
  }

  handleEmailMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      emailMessage: event.target.value
    })
  }

  renderEmailShare = () => {
    const { classes, template } = this.props;
    return <div className={classes.tabbody}>
      {/* <h5 className={classes.sectionHeader}>电子邮件</h5>
      <br/> */}
      <p className={classes.inputlabel}>收件人</p>
      <TextInput className={classes.textInput} placeholder='xxx@example.com' type='text' value={this.state.emailAddress} onChange={this.handleEmailAddressChange}/>
      <br/>
      <p className={classes.inputlabel}>主题</p>
      <TextInput className={classes.textInput} placeholder={template.title} type='text' value={this.state.emailTitle} onChange={this.handleEmailTitleChange}/>
      <br/>
      <p className={classes.inputlabel}>留言</p>
      <TextInput className={classes.textInput} placeholder='我已邀请您填写表单。' type='text' value={this.state.emailMessage} onChange={this.handleEmailMessageChange}/>
    </div>;
  }

  renderIFrameShare = () => {
    const { classes, publicUrl } = this.props;
    return <div className={classes.tabbody}>
      {/* <h5 className={classes.sectionHeader}>电子邮件</h5>
      <br/> */}
      <p className={classes.inputlabel}>代码</p>
      <TextInput className={classes.textInput} placeholder='嵌入网页' type='text' readOnly value={publicUrl}/>
    </div>;
  }

  render() {
    const { onClose, classes, publicUrl } = this.props;
    return <ResponsivePanel
      onClose={onClose}
      title='分享'
      submitLabel='发送'
    >
      <section className={classes.section}>
        <h5 className={classes.sectionHeader}>链接</h5>
        <TextInput className={classes.textInput} placeholder='链接' type='text' readOnly value={publicUrl}/>
      </section>
      <section className={classes.section}>
        <span className={classes.tablabel}>分享方式</span>
        <Tabs className={classes.tab} names={['邮件','嵌入网页']} value={this.state.currentTabName} onChange={this.handleTabChange} height='36px'/>
        {
            this.state.currentTabName === '邮件' ?
              this.renderEmailShare() :
              this.renderIFrameShare()
        }
        
      </section>
    </ResponsivePanel>
  }
}

const withConnect = connect<stateProps, IShareDialogProps>(mapStateToProps);

const withStyle = injectSheet(styles);

export default withConnect(withStyle(ShareDialog))