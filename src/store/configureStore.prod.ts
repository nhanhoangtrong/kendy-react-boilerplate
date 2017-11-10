import { createStore, Store } from 'redux';
import rootReducer from './rootReducer';
import enhancer from './enhancer';

export default (initialState?: any): Store<any> => {
    return createStore(rootReducer, initialState, enhancer);
};
