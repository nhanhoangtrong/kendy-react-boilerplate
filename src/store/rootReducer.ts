import { combineReducers, Reducer } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';
import todos from '../containers/TodoApp/reducer';
import globals from '../containers/MainApp/reducer';

export default combineReducers<any>({
    todos,
    globals,
    router: routerReducer,
});
