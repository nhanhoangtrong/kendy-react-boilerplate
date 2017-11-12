import { createAction } from 'redux-actions';
import { TOGGLE_LOADING, SET_FILTER } from './constants';

export const toggleLoading = createAction(TOGGLE_LOADING);
export const setFilter = createAction<TodoApp.Filter>(SET_FILTER);
export const waitLoading = () => {
    console.log('is waiting');
    return (dispatch: any) => {
        setTimeout(() => {
            console.log('it worked!');
            dispatch(toggleLoading());
        }, 1000);
    };
};
