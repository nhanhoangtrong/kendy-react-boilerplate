import * as React from 'react';
import Link from '../containers/Link';
import { MainAppContainerProps } from '../containers/MainAppContainer';

export type MainAppProps = MainAppContainerProps;

export default class MainApp extends React.Component<MainAppContainerProps, {}> {
    constructor(props?: any, context?: any) {
        super(props, context);
        this.onClickGoTodo = this.onClickGoTodo.bind(this);
    }

    public render() {
        return (
            <div>
                <button type="button" onClick={this.onClickGoTodo}>Request Todo App</button>
                <Link to="/todo">Request todo</Link>
            </div>
        );
    }

    private onClickGoTodo(e: React.MouseEvent<HTMLButtonElement>) {
        this.props.push('/todo');
    }
}
