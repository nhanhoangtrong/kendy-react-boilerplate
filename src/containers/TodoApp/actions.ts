import { createAction } from 'redux-actions';
import * as Constants from './constants';

export const addTodo = createAction<any>(Constants.ADD_TODO);
export const editTodo = createAction<any>(Constants.EDIT_TODO);
export const deleteTodo = createAction<string>(Constants.DELETE_TODO);
export const completeTodo = createAction<string>(Constants.COMPLETE_TODO);
export const completeAll = createAction(Constants.COMPLETE_ALL);
export const clearCompleted = createAction(Constants.CLEAR_COMPLETED);
