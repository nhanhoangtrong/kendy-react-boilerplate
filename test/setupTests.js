// Setup Enzyme with React 16 Adapter
// First, we need to polyfill requestAnimationFrame
require('raf/polyfill');
const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// Then, configure enzyme with a adapter instance
enzyme.configure({ adapter: new Adapter() });
