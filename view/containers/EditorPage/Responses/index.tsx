import React from 'react';
import { createSelector } from 'reselect';
import { Dispatch, compose } from 'redux';
import { $Call } from 'utils/types';
import { connect } from 'react-redux';
import { makeSelectResponses, makeSelectLoadingResponses, makeSelectLoadingResponsesError } from './selectors';
import { loadResponses } from './actions';
import EditorPageResponsesLayout from './Layout';
import Indicator from 'components/Indicator';
import ErrorCircle from 'components/icons/ErrorCircle';

interface IState {
}

const mapStateToProps = createSelector(
  makeSelectResponses(),
  makeSelectLoadingResponses(),
  makeSelectLoadingResponsesError(),
  (responses, loading, loadingError) => ({ responses, loading, loadingError })
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onLoadResponses: (formId: string) => dispatch(loadResponses(formId))
});

interface IEditorPageResponsesProps {
  formId: string;
}

type stateProps = $Call<typeof mapStateToProps>;
type dispatchProps = $Call<typeof mapDispatchToProps>;

type IProps = stateProps & dispatchProps & IEditorPageResponsesProps;

class EditorPageResponses extends React.PureComponent<IProps, IState> {
  state: IState = {
  }

  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    const {onLoadResponses, formId} = this.props;
    onLoadResponses(formId);
  }

  public render() {
    const { responses, loading } = this.props;

    if (loading) {
      return <></>;
    }
    if (!responses || responses.length === 0) {
      return <Indicator icon={ErrorCircle} message="暂时还没有收到提交哦！" />
    }
    return <EditorPageResponsesLayout responses={responses} />
  }
}

const withConnect = connect<stateProps, dispatchProps, IEditorPageResponsesProps>(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect
)(EditorPageResponses);
