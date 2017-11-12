import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TodoApp from '../../components/TodoApp';
import { addTodo } from './actions';
import { toggleLoading } from '../MainApp/actions';
import { RootState, RootDispatch } from '../../store/types';

export interface TodoAppStateProps {
    filter: TodoApp.Filter;
    isLoading: boolean;
    items: TodoApp.Item[];
}

export interface TodoAppDispatchProps {
    addTodo: any;
    toggleLoading: any;
}

export type TodoAppProps = TodoAppStateProps & TodoAppDispatchProps;

const mapStateToProps = (state: RootState) => {
    const filter = state.todos.filter;
    const items = state.todos.items.filter((todo) => {
        return true;
    });
    return {
        filter,
        isLoading: state.globals.isLoading,
        items,
    };
};

const mapDispatchToProps = (dispatch: RootDispatch) => ({
    toggleLoading: bindActionCreators(toggleLoading, dispatch),
    addTodo: bindActionCreators(addTodo, dispatch),
});

export default connect<TodoAppStateProps, TodoAppDispatchProps, {}>(mapStateToProps, mapDispatchToProps)(TodoApp);
