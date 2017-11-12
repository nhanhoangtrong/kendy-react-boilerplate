import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push, RouterAction } from 'react-router-redux';
import { LocationDescriptorObject } from 'history';

export interface LinkOwnProps extends React.AnchorHTMLAttributes<any> {
    href: string;
    children?: React.ReactNode | string;
}

export interface LinkDispatchProps extends React.Props<any> {
    pushTo: (location: string | LocationDescriptorObject, state?: any) => RouterAction;
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
        this.props.pushTo(this.props.href);
    }
    public render() {
        const { href, children, pushTo, ...props } = this.props;
        return (
            <a href={href} onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                pushTo(href);
            }} {...props}>
                {children}
            </a>
        );
    }
}

export default connect<null, LinkDispatchProps, LinkOwnProps>(null, mapDispatchToProps)(Link);
