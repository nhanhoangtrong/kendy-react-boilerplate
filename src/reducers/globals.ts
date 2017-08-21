import { handleActions } from 'redux-actions';
import * as ActionTypes from '../types';
import { Map } from 'immutable';

const initialState: GlobalStoreState = Map({
    filter: ActionTypes.SHOW_ALL,
    isLoading: true,
});

export default handleActions<GlobalStoreState, null | TodoFilterType>({
    [ActionTypes.SET_FILTER]: (state, action) => (state.set('filter', action.payload)),
    [ActionTypes.TOGGLE_LOADING]: (state, action) => (state.set('isLoading', !state.get('isLoading'))),

}, initialState);
