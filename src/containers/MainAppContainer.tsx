import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { RootDispatch } from '../store';
import MainApp from '../components/MainApp';

export interface MainAppContainerDispatchProps extends React.Props<any> {
    push: ReduxActions.ActionFunction1<string, ReduxActions.Action<string>>;
}

export type MainAppContainerProps = MainAppContainerDispatchProps;

const mapDispatchToProps = (dispatch: RootDispatch) => ({
    push: bindActionCreators(push, dispatch),
});

export default connect<null, MainAppContainerDispatchProps, null>(null, mapDispatchToProps)(MainApp);
