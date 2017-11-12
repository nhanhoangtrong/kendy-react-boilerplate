import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addTodo } from './actions';
import TodoList from '../../components/TodoList';
import { RootDispatch } from '../../store/types';

export interface TodoListDispatchProps {
    addTodo: ReduxActions.ActionFunction1<TodoApp.Item, ReduxActions.Action<TodoApp.Item>>;
}

export interface TodoListOwnProps {
    todos: TodoApp.Item[];
}

export type TodoListProps = TodoListDispatchProps & TodoListOwnProps;

const mapDispatchToProps = (dispatch: RootDispatch) => {
    return {
        addTodo: bindActionCreators(addTodo, dispatch),
    };
};

export default connect<null, TodoListDispatchProps, TodoListOwnProps>(null, mapDispatchToProps)(TodoList);
