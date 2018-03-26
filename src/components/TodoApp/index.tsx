import * as React from 'react';
import * as styles from './style.styl';
import * as classNames from 'classnames';
import { Route, RouteComponentProps } from 'react-router';
import NavBar from '../NavBar';

import InputTodo from '../InputTodo';
import TodoList from '../TodoList';
import LoadingIndicator from '../LoadingIndicator';
import { TodoAppProps } from '../../modules/TodoApp';

export default (props: TodoAppProps) => (
    <div className={styles.todoApp}>
        <h1>
            Hello, filter is {props.filter} and isLoading is{' '}
            {props.isLoading ? 'true' : 'false'}!{' '}
            <button onClick={props.toggleLoading}>toggle</button>
        </h1>
        <TodoList todos={props.items} addTodo={props.addTodo} />
        <LoadingIndicator visible={props.isLoading} />
        <NavBar />
    </div>
);
