import { handleActions } from 'redux-actions';
import { SHOW_ALL } from '../TodoApp/constants';
import { SET_FILTER, TOGGLE_LOADING } from './constants';
import { Map } from 'immutable';

const initialState: any = Map({
    filter: SHOW_ALL,
    isLoading: true,
});

export default handleActions<any, any>({
    [SET_FILTER]: (state, action) => (state.set('filter', action.payload)),
    [TOGGLE_LOADING]: (state, action) => (state.set('isLoading', !state.get('isLoading'))),
}, initialState);
