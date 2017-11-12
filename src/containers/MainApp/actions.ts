import { createAction } from 'redux-actions';
import { TOGGLE_LOADING } from './constants';
import { Dispatch } from 'redux';

export const toggleLoading = createAction(TOGGLE_LOADING);
export const waitLoading = () => {
    return (dispatch: Dispatch<any>) => {
        setTimeout(() => {
            dispatch(toggleLoading());
        }, 1000);
    };
};
