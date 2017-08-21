import thunkMiddleware from 'redux-thunk';
import { compose, applyMiddleware } from 'redux';
import { history } from '../history';
import { routerMiddleware } from 'react-router-redux';

export default applyMiddleware(thunkMiddleware, routerMiddleware(history));
