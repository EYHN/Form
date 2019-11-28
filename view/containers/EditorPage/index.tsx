import React from 'react';
import EditorLayout from 'components/Layout/EditorLayout';
import Editor from 'components/Form/Editor';
import Settings from 'components/icons/Settings';
import AppBarIconButton from 'components/AppBar/AppBarIconButton';
import Tooltip from 'components/Tooltip';
import AppBarTitle from 'components/AppBar/AppBarTitle';
import LockOpen from 'components/icons/LockOpen';
import Back from 'components/icons/Back';
import { RouteComponentProps } from 'react-router';
import { makeSelectEditorPageFormId, makeSelectEditorPageFormTemplate, makeSelectEditorPageError, makeSelectEditorPageLoading, makeSelectEditorPagePrivateKey, makeSelectEditorPageUnlocked } from './selectors';
import { createSelector } from 'reselect';
import { Dispatch, compose } from 'redux';
import { loadEditorPage, updateEditorPageFormTemplate, unlockEditorPage } from './actions';
import { $Call } from 'utils/types';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import editorPageReducer from './reducer';
import editorPageSaga from './saga';
import SettingDialog from './SettingDialog';
import NoSSR from 'components/NoSSR';
import UnlockDialog from './UnlockDialog';
import Lock from 'components/icons/Lock';
import LoadingIndicator from 'components/LoadingIndicator';
import Share from 'components/icons/Share';
import Indicator from 'components/Indicator';
import ApiError from 'api/ApiError';
import ErrorCircle from 'components/icons/ErrorCircle';
import NotFound from 'components/icons/NotFound';
import NetworkError from 'api/NetworkError';
import WifiOff from 'components/icons/WifiOff';
import ShareDialog from './ShareDialog';
import { IFormTemplate } from '@interface/Form';
import EditorPageResponses from './Responses';
import Helmet from './Helmet';

interface IState {
  currentTabName: string;
  settingDialog: boolean;
  shareDialog: boolean;
}

const mapStateToProps = createSelector(
  makeSelectEditorPageFormId(),
  makeSelectEditorPageFormTemplate(),
  makeSelectEditorPageLoading(),
  makeSelectEditorPageError(),
  makeSelectEditorPagePrivateKey(),
  makeSelectEditorPageUnlocked(),
  (id, template, loading, error, privateKey, unlocked) => ({ id, template, loading, error, privateKey, unlocked })
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onLoadEditorPage: (id: string) => (dispatch(loadEditorPage(id))),
  onFormUpdate: (template: IFormTemplate) => (dispatch(updateEditorPageFormTemplate(template))),
  onUnlockEditorPage: (password: string) => (dispatch(unlockEditorPage(password)))
});

interface IEditorPageProps extends RouteComponentProps<{id: string}> {
}

type stateProps = $Call<typeof mapStateToProps>;
type dispatchProps = $Call<typeof mapDispatchToProps>;

type IProps = stateProps & dispatchProps & IEditorPageProps;

class EditorPage extends React.PureComponent<IProps, IState> {
  state: IState = {
    currentTabName: '问题',
    settingDialog: false,
    shareDialog: false
  }

  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    const {onLoadEditorPage, match, id} = this.props;
    if (id === null || id !== match.params.id) {
      onLoadEditorPage(match.params.id);
    }
  }

  handleChange = (template: IFormTemplate) => {
    this.props.onFormUpdate(template);
  }

  handleTabChange = (tabname: string) => {
    this.setState({
      currentTabName: tabname
    });
  }

  handleOpenSettingDialog = () => {
    const { template } = this.props;
    if (template)
    this.setState({
      settingDialog: true
    });
  }

  handleOpenShareDialog = () => {
    const { template } = this.props;
    if (template)
    this.setState({
      shareDialog: true
    });
  }

  handleCloseSettingDialog = () => {
    this.setState({
      settingDialog: false
    });
  }

  handleCloseShareDialog = () => {
    this.setState({
      shareDialog: false
    });
  }

  handleUnlockDialogSubmit = (password: string) => {
    this.props.onUnlockEditorPage(password);
  }

  renderEditor = () => {
    const { template, unlocked, loading } = this.props;
    return <Editor
      onChange={this.handleChange}
      template={template}
      disabled={!unlocked || loading}
    />
  }

  renderResponses = () => {
    return <EditorPageResponses formId={this.props.id} />
  }

  renderUnlockDialog = () => {
    return <UnlockDialog />
  }

  renderSettingDialog = () => {
    return <SettingDialog onClose={this.handleCloseSettingDialog} />
  }

  renderShareDialog = () => {
    return <ShareDialog onClose={this.handleCloseShareDialog} />
  }

  renderErrorIndicator = () => {
    const { error } = this.props;
    if (error instanceof ApiError) {
      if (error.status === 404) {
        return <Indicator icon={NotFound} message='找不到表单' />
      } else if (error.status === 500) {
        return <Indicator icon={ErrorCircle} message='服务器异常' />
      }
    } else if (error instanceof NetworkError) {
      return <Indicator icon={WifiOff} message='无法连接到服务器' />
    }
    return <Indicator icon={ErrorCircle} message='无法加载表单' />
  }

  handleBackButton = () => {
    const { history } = this.props;
    history.push('/')
  }

  public render() {
    const { template, unlocked, error } = this.props;
  
    return <>
      <Helmet formTitle={template && template.title} />
      <EditorLayout
        appbarleft={
          <>
            <AppBarIconButton icon={Back} onClick={this.handleBackButton}></AppBarIconButton>
            <AppBarTitle>{template ? template.title : '加载中...'}</AppBarTitle>
            <Tooltip tip='加密' dir='bottom'><AppBarIconButton icon={unlocked ? LockOpen : Lock}></AppBarIconButton></Tooltip>
          </>
        }
        appbarright={
          <>
            <Tooltip tip='分享' dir='bottom'><AppBarIconButton icon={Share} onClick={this.handleOpenShareDialog}></AppBarIconButton></Tooltip>
            <Tooltip tip='设置' dir='bottom'><AppBarIconButton icon={Settings} onClick={this.handleOpenSettingDialog}></AppBarIconButton></Tooltip>
          </>
        }
        tabnames={['问题', '回复']}
        tabvalue={this.state.currentTabName}
        onTabChange={this.handleTabChange}
        disabled={!unlocked}
      >
        {
          error ?
          this.renderErrorIndicator() :
          template ?
            this.state.currentTabName !== '回复' ?
              this.renderEditor() :
              this.renderResponses()
            : <LoadingIndicator height='300px' />
        }
        <NoSSR>
          {
            template && this.state.settingDialog &&
            this.renderSettingDialog()
          }
          {
            template && this.state.shareDialog &&
            this.renderShareDialog()
          }
          {
            template && !unlocked &&
              this.renderUnlockDialog()
          }
        </NoSSR>
      </EditorLayout>
    </>
  }
}

const withConnect = connect<stateProps, dispatchProps, IEditorPageProps>(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'editorPage', reducer: editorPageReducer });
const withSage = injectSaga({ key: 'editorPage', saga: editorPageSaga })

export default compose(
  withReducer,
  withSage,
  withConnect
)(EditorPage);