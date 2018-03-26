import { createStore, Reducer, Store } from 'redux';
import rootReducer from './rootReducer';
import enhancer from './enhancer';
import { RootState } from './types';

export default (initialState?: RootState): Store<RootState> => {
    const create = window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()(createStore)
        : createStore;

    const createStoreWithMiddleware = enhancer<RootState>(create);

    const store = createStoreWithMiddleware(rootReducer, initialState);

    if (module.hot) {
        module.hot.accept('./rootReducer', () => {
            const nextReducer = require('./rootReducer').default as Reducer<
                RootState
            >;
            store.replaceReducer(nextReducer);
        });
    }

    return store;
};
