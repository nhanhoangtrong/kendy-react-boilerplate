import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addTodo } from './actions';
import TodoList from '../../components/TodoList';

const mapDispatchToProps = (dispatch: any) => {
    return {
        addTodo: bindActionCreators(addTodo, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(TodoList) as any;
