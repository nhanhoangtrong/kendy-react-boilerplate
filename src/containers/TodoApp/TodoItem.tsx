import * as React from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import TodoItem from '../../components/TodoItem';
import { Store, Dispatch, bindActionCreators } from 'redux';
import { editTodo, completeTodo, deleteTodo } from './actions';
import { RootDispatch } from '../../store/types';

export interface TodoItemDispatchProps {
    completeTodo: ReduxActions.ActionFunction1<string, ReduxActions.Action<string>>;
    deleteTodo: ReduxActions.ActionFunction1<string, ReduxActions.Action<string>>;
    editTodo: ReduxActions.ActionFunction1<TodoApp.Item, ReduxActions.Action<TodoApp.Item>>;
}

export interface TodoItemOwnProps {
    todo: TodoApp.Item;
}

export type TodoItemProps = TodoItemOwnProps & TodoItemDispatchProps;

const mapDispatchToProps = (dispatch: RootDispatch) => ({
    completeTodo: bindActionCreators(completeTodo, dispatch),
    deleteTodo: bindActionCreators(deleteTodo, dispatch),
    editTodo: bindActionCreators(editTodo, dispatch),
});

export default connect<null, TodoItemDispatchProps, TodoItemOwnProps>(null, mapDispatchToProps)(TodoItem);
