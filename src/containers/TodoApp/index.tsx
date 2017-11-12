import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TodoApp from '../../components/TodoApp';
import * as GlobalsActions from '../MainApp/actions';
import * as TodosActions from './actions';

export interface TodoAppContainerStateProps extends React.Props<any> {
    filter: TodoApp.Filter;
    isLoading: boolean;
    todos: TodoApp.Item[];
}

export interface TodoAppContainerDispatchProps extends React.Props<any> {
    globalsActions: any;
    todosActions: any;
}

export type TodoAppContainerProps = TodoAppContainerStateProps & TodoAppContainerDispatchProps;

const mapStateToProps = (state: any) => {
    const filter = state.globals.get('filter');
    const todos = state.todos.filter((todo: any) => {
        return true;
    });
    return {
        filter,
        isLoading: state.globals.get('isLoading'),
        todos,
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    globalsActions: bindActionCreators(GlobalsActions as any, dispatch),
    todosActions: bindActionCreators(TodosActions as any, dispatch),
});

export default connect<TodoAppContainerStateProps, TodoAppContainerDispatchProps, {}>(mapStateToProps, mapDispatchToProps)(TodoApp);
