import * as React from 'react';
import { mount } from 'enzyme';
import { Tag } from '../src/components/Tag/index';

describe('Test Tag Component', function() {

    it('must show warning when use invalid type', function() {
        const spyError: jasmine.Spy = spyOn<Console>(console, 'error');
        
        // @ts-ignore
        mount(<Tag tagName="div" forwardedRef="" />);

        // @ts-ignore
        expect(spyError.calls.argsFor(0)[0]).toContain('Warning: Failed prop type: Invalid prop `forwardedRef` of type `string` supplied to `Tag`, expected `function`.');
    });

});
