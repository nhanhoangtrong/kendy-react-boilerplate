import { createAction } from 'redux-actions';
import * as ActionTypes from './constants';

export const addTodo = createAction<TodoApp.Item>(ActionTypes.ADD_TODO);
export const editTodo = createAction<TodoApp.Item>(ActionTypes.EDIT_TODO);
export const deleteTodo = createAction<string>(ActionTypes.DELETE_TODO);
export const completeTodo = createAction<string>(ActionTypes.COMPLETE_TODO);
export const completeAll = createAction<null>(ActionTypes.COMPLETE_ALL);
export const clearCompleted = createAction<null>(ActionTypes.CLEAR_COMPLETED);

export const showAll = createAction<null>(ActionTypes.SHOW_ALL);
export const showActive = createAction<null>(ActionTypes.SHOW_ACTIVE);
export const showCompleted = createAction<null>(ActionTypes.SHOW_COMPLETED);
