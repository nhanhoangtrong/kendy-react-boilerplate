import * as React from 'react';
import { Provider } from 'react-redux';
import { RootStore } from '../store';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { history } from '../history';

import MainAppContainer from '../containers/MainAppContainer';
import TodoAppContainer from '../containers/TodoAppContainer';

interface AppProps {
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
