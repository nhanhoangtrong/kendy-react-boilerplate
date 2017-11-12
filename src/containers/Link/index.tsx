import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export interface LinkOwnProps extends React.AnchorHTMLAttributes<any> {
    to: string;
    children?: React.ReactNode | string;
}

export interface LinkDispatchProps extends React.Props<any> {
    pushTo: ReduxActions.ActionFunctionAny<any>;
}

const mapDispatchToProps = (dispatch: any) => ({
    pushTo: bindActionCreators(push, dispatch),
});

export type LinkProps = LinkOwnProps & LinkDispatchProps;

class Link extends React.PureComponent<LinkProps, {}> {
    constructor(props: LinkProps, ctx?: any) {
        super(props, ctx);
        this.onClick = this.onClick.bind(this);
    }
    private onClick(e: React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        this.props.pushTo(this.props.to);
    }
    public render() {
        const { to, children, pushTo, ...props } = this.props;
        return (
            <a href={to} onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                pushTo(to);
            }} {...props}>
                {children}
            </a>
        );
    }
}

export default connect<null, LinkDispatchProps, LinkOwnProps>(null, mapDispatchToProps)(Link);
