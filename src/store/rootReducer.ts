import { combineReducers, Reducer } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';
import todos from '../modules/TodoApp/reducer';
import globals from '../modules/MainApp/reducer';
import { RootState } from './types';

export default combineReducers<RootState>({
    todos,
    globals,
    router: routerReducer,
});
