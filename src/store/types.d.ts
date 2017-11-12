import { Store, Dispatch } from 'redux';
import { RouterState } from 'react-router-redux';

declare interface RootState {
    todos: TodoApp.State;
    globals: MainApp.State;
    router: RouterState;
}

declare type RootStore = Store<RootState>;
declare type RootDispatch = Dispatch<RootState>;
