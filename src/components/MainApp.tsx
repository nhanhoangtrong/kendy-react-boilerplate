import * as React from 'react';
import Link from '../modules/Link';
import { MainAppProps } from '../modules/MainApp';

export default class MainApp extends React.Component<MainAppProps, {}> {
    constructor(props?: MainAppProps, context?: any) {
        super(props, context);
        this.onClickGoTodo = this.onClickGoTodo.bind(this);
    }

    public render() {
        return (
            <div>
                <button type="button" onClick={this.onClickGoTodo}>
                    Request Todo App
                </button>
            </div>
        );
    }

    private onClickGoTodo(e: React.MouseEvent<HTMLButtonElement>) {
        this.props.push('/todo');
    }
}
