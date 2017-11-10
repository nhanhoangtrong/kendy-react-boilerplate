import { Store, Dispatch } from 'redux';

export type RootStore = Store<any>;
export type RootDispatch = Dispatch<any>;

export default (__DEV__ ? require('./configureStore.dev.ts').default : require('./configureStore.prod.ts').default) as (initialState?: any) => RootStore;
