import { createStore, Reducer, Store } from 'redux';
import rootReducer from './rootReducer';
import enhancer from './enhancer';

export default (initialState?: any): Store<any> => {
    const create = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__()(createStore) : createStore;

    const createStoreWithMiddleware = enhancer(create);

    const store = createStoreWithMiddleware(rootReducer, initialState) as Store<any>;

    if (module.hot) {
        module.hot.accept('./rootReducer', () => {
            console.log('Replacing root reducer...');
            const nextReducer = require('./rootReducer').default as Reducer<any>;
            store.replaceReducer(nextReducer);
        });
    }

    return store;
};
