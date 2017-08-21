import { Store, Dispatch } from 'redux';
import { RootState } from '../reducers';

export type RootStore = Store<RootState>;
export type RootDispatch = Dispatch<RootState>;

export default (__DEV__ ? require('./configureStore.dev.ts').default : require('./configureStore.prod.ts').default) as (initialState?: RootState) => RootStore;
