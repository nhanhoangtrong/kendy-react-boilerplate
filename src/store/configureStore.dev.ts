import { createStore, Reducer, Store } from 'redux';
import rootReducer, { RootState } from '../reducers';
import enhancer from './enhancer';

export default (initialState?: RootState): Store<RootState> => {
    const create = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__()(createStore) : createStore;

    const createStoreWithMiddleware = enhancer(create);

    const store = createStoreWithMiddleware(rootReducer, initialState) as Store<RootState>;

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            console.log('Replacing root reducer...');
            const nextReducer = require('../reducers').default as Reducer<RootState>;
            store.replaceReducer(nextReducer);
        });
    }

    return store;
};
