
/* global describe, it, expect */

import {cleanUpProps} from '../src/helpers';

describe('Test cleanUpProps function', function() {

    it('must return new object with values', function() {
        const props = {
            some: 'props'
        };

        const cleanProps = cleanUpProps(props);

        expect(props).not.toBe(cleanProps);
        expect(props).toEqual({some: 'props'});
        expect(cleanProps).toEqual({some: 'props'});
    });

    it('must delete bem lib props', function() {
        const props = {
            some: 'props',
            bemName: 'block',
            bemMod: [],
            className: 'class'
        };

        const cleanProps = cleanUpProps(props);
        const keys = Object.keys(cleanProps);

        expect(keys).toContain('some');
        expect(keys).not.toContain('bemName');
        expect(keys).not.toContain('bemMod');
        expect(keys).not.toContain('className');
    });

});
