import * as ReactDOM from 'react-dom';
import * as React from 'react';
import configureStore from './store';
import { AppContainer } from 'react-hot-loader';
import App, { AppRootComponent } from './components/App';

const store = configureStore(window.__PRELOADED_STATE__);

const render = (AppComponent: AppRootComponent) => {
    ReactDOM.render(
        (
            <AppContainer>
                <AppComponent store={store} />
            </AppContainer>
        ),
        document.getElementById('app'),
    );
};

render(App);

if (module.hot) {
    console.log(`Development is running with NODE_ENV=${process.env.NODE_ENV} and __DEV__=${__DEV__}`);
    module.hot.accept('./components/App', () => {
        console.log('Replacing next "App" Component...');
        const NextApp = require('./components/App').default;
        render(NextApp);
    });
}
