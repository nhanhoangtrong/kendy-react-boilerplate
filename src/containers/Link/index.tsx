import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export interface LinkOwnProps extends React.AnchorHTMLAttributes<any> {
    to: string;
    children?: React.ReactNode[] | string;
}

export interface LinkDispatchProps extends React.Props<any> {
    pushTo: ReduxActions.ActionFunction1<string, ReduxActions.Action<string>>;
}

const mapDispatchToProps = (dispatch: any) => ({
    pushTo: bindActionCreators(push, dispatch),
});

export default connect<any, any, any>(null, mapDispatchToProps)((props: any) => {
    return (
        <a href={props.to} onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            props.pushTo(props.to);
        }} {...props}>
            {props.children}
        </a>
    );
});
