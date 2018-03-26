import * as React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import history from '../history';

import MainAppContainer from '../modules/MainApp';
import TodoAppContainer from '../modules/TodoApp';
import { RootStore } from '../store/types';

export interface AppProps {
    store: RootStore;
}

export type AppRootComponent = React.StatelessComponent<AppProps>;

export default (props: AppProps) => (
    <Provider store={props.store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/" component={MainAppContainer} />
                <Route path="/todo" component={TodoAppContainer} />
            </Switch>
        </ConnectedRouter>
    </Provider>
);
