import { combineReducers, Reducer } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';
import todos from '../containers/TodoApp/reducer';
import globals from '../containers/MainApp/reducer';
import { RootState } from './types';

export default combineReducers<RootState>({
    todos,
    globals,
    router: routerReducer,
});
