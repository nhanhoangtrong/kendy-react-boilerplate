import { Store, Dispatch } from 'redux';
import { RootState, RootStore } from './types';

export default (__DEV__ ? require('./configureStore.dev.ts').default : require('./configureStore.prod.ts').default) as (initialState?: RootState) => RootStore;
