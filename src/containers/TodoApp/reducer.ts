import { handleActions } from 'redux-actions';
import * as ActionTypes from './constants';

const initialState: TodoApp.Item[] = [{
    id: '1',
    text: 'Temp Todo',
    completed: false,
}];

export default handleActions<any, any>({
    [ActionTypes.ADD_TODO]: (state, action) => {
        return [{
            id: Math.random().toString(),
            completed: false,
            ...action.payload,
        }, ...state];
    },

    [ActionTypes.DELETE_TODO]: (state, action) => {
        return state.filter((todo: TodoApp.Item) => todo.id !== action.payload);
    },

    [ActionTypes.EDIT_TODO]: (state, action) => {
        return state.map((todo: any) => {
            return todo.id === action.payload.id ? {
                ...todo,
                text: action.payload.text,
            } : todo;
        });
    },

    [ActionTypes.COMPLETE_TODO]: (state, action) => {
        return state.map((todo: any) => {
            return todo.id === action.payload ? {
                ...todo,
                completed: !todo.completed,
            } : todo;
        });
    },

    [ActionTypes.COMPLETE_ALL]: (state, action) => {
        const allAreMarked = state.every((todo: any) => todo.completed);
        return state.map((todo: any) => ({
            ...todo,
            completed: !allAreMarked,
        }));
    },

    [ActionTypes.CLEAR_COMPLETED]: (state, action) => {
        return state.filter((todo: any) => todo.completed === false);
    },
}, initialState);
