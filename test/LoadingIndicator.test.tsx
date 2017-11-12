import * as React from 'react';
import { shallow } from 'enzyme';
import LoadingIndicator from '../src/components/LoadingIndicator';

test('It should render LoadingIndicator', () => {
    shallow(<LoadingIndicator visible={true} />);
});
