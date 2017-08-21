import { createStore, Store } from 'redux';
import rootReducer, { RootState } from '../reducers';
import enhancer from './enhancer';

export default (initialState?: RootState): Store<RootState> => {
    return createStore(rootReducer, initialState, enhancer);
};
