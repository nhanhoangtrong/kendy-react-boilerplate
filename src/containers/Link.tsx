import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootDispatch } from '../store';
import { push } from 'react-router-redux';

export interface LinkOwnProps extends React.AnchorHTMLAttributes<any> {
    to: string;
    children?: React.ReactNode[] | string;
}

export interface LinkDispatchProps extends React.Props<any> {
    pushTo: ReduxActions.ActionFunction1<string, ReduxActions.Action<string>>;
}

const mapDispatchToProps = (dispatch: RootDispatch) => ({
    pushTo: bindActionCreators(push, dispatch),
});

export default connect<null, LinkDispatchProps, LinkOwnProps>(null, mapDispatchToProps)(({ to, children, pushTo, ...props }) => {
    return (
        <a href={to} onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            pushTo(to);
        }} {...props}>
            {children}
        </a>
    );
});
