import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push, RouterAction } from 'react-router-redux';
import MainApp from '../../components/MainApp';
import { LocationDescriptorObject } from 'history';

export interface MainAppDispatchProps {
    push: (location: string | LocationDescriptorObject, state?: any) => RouterAction;
}

export type MainAppProps = MainAppDispatchProps;

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    push: bindActionCreators(push, dispatch),
});

export default connect<null, MainAppDispatchProps, null>(null, mapDispatchToProps)(MainApp);
