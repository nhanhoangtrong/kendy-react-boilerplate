/* tslint:disable:no-var-requires */
// As React 16 need requestAnimationFrame polyfill
require('raf/polyfill');
__DEV__ ? require('./index.dev') : require('./index.prod');
