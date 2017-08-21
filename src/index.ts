/* tslint:disable:no-var-requires */
import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
__DEV__ ? require('./index.dev') : require('./index.prod');
