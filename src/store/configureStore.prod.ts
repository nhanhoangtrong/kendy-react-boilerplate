import { createStore, Store } from 'redux';
import rootReducer from './rootReducer';
import enhancer from './enhancer';
import { RootState } from './types';

export default (initialState?: RootState): Store<RootState> => {
    return createStore(rootReducer, initialState, enhancer);
};
