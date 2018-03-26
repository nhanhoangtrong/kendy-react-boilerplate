import * as ReactDOM from 'react-dom';
import * as React from 'react';
import configureStore from './store';
import App from './components/App';

const store = configureStore(window.__PRELOADED_STATE__);

ReactDOM.hydrate(<App store={store} />, document.getElementById('app'));
