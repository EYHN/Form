import React from 'react';
import { Styles } from 'jss';
import injectSheet, { WithStyles } from 'react-jss';
import Left from 'components/icons/Left';
import Right from 'components/icons/Right';
import TextInput from 'components/Form/TextInput';
import { IDecryptedResponse } from './actions';
import Form from 'components/Form';
import ToolBar from 'components/ToolBar/ToolBar';
import ToolBarIconButton from 'components/ToolBar/ToolBarIconButton';
import ToolBarText from 'components/ToolBar/ToolBarText';

const styles: Styles = {
  root: {
    marginBottom: '24px'
  },
  card: {
    margin: '12px',
    paddingTop: '12px',
    paddingBottom: '24px',
    paddingLeft: '30px',
    paddingRight: '30px',
    background: '#fff',
    borderTop: '8px solid #22bff4',
    boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px',
    minHeight: '400px'
  },
  toolbar: {
    margin: '8px 0'
  },
  pageNumberInput: {
    width: '32px',
    textAlign: 'center',
    appearance: 'none'
  }
};

interface IEditorPageResponsesLayoutProps {
  responses: IDecryptedResponse[];
}

interface IEditorPageResponsesLayoutState {
  page: number;
  pageInput: string;
}

type IProps = IEditorPageResponsesLayoutProps & WithStyles<typeof styles>;
type IState = IEditorPageResponsesLayoutState;

class EditorPageResponsesLayout extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      page: 1,
      pageInput: "1"
    };
  }

  clampPageNumber = (page: number) => {
    const { responses } = this.props;
    return Math.max(Math.min(page || 1, responses.length), 1)
  }
  
  // Make the page number input uncontrolled
  handleNext = () => this.setState((state) => ({page: this.clampPageNumber(state.page + 1), pageInput: this.clampPageNumber(state.page + 1).toString()}))
  handlePrev = () => this.setState((state) => ({page: this.clampPageNumber(state.page - 1), pageInput: this.clampPageNumber(state.page - 1).toString()}))
  handleInputChange: React.ChangeEventHandler<HTMLInputElement> =
    (e) => {
      this.setState({pageInput: e.target.value.replace(/[^0-9]/ig,"")});
    }

  // reset input value when blur or submit
  handleInputBlur: React.FocusEventHandler<HTMLInputElement> =
    () => this.setState((state) => ({page: this.clampPageNumber(parseInt(state.pageInput)), pageInput: this.clampPageNumber(parseInt(state.pageInput)).toString()}))
  handleInputSubmit: React.FormEventHandler<HTMLFormElement> =
    (e) => {
      this.setState((state) => ({page: this.clampPageNumber(parseInt(state.pageInput)), pageInput: this.clampPageNumber(parseInt(state.pageInput)).toString()}));
      e.preventDefault();
    }

  render() {
    const { responses, classes } = this.props;
    const response = responses[this.state.page - 1];

    return <div className={classes.root}>
      <ToolBar className={classes.toolbar}>
        <ToolBarIconButton onClick={this.handlePrev} className={classes.toolbarIcon} icon={Left} />
        <ToolBarText>
          <form onSubmit={this.handleInputSubmit}>
            第 <TextInput type='string' inputClassName={classes.pageNumberInput} inline onChange={this.handleInputChange} onBlur={this.handleInputBlur} value={this.state.pageInput.toString()} /> 条，共 {responses.length} 条
          </form>
        </ToolBarText>
        <ToolBarIconButton onClick={this.handleNext} className={classes.toolbarIcon} icon={Right} />
      </ToolBar>
      <div className={classes.card}>
        {response && <Form submitButton={false} key={response.id} disabled template={response.template} values={response.value} />}
      </div>
    </div>
  }
}

export default injectSheet(styles)(EditorPageResponsesLayout);
