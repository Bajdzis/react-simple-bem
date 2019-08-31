
/* global describe, it, expect */

import {cleanUpProps} from '../src/helpers';
import { BEMNodeProps } from '../src/decorators/BEMNode';

describe('Test cleanUpProps function', function() {

    it('must return new object with values', function() {
        const props: {[key: string]: any} = {
            some: 'props'
        };

        const cleanProps: {[key: string]: any} = cleanUpProps(props);

        expect(props).not.toBe(cleanProps);
        expect(props).toEqual({some: 'props'});
        expect(cleanProps).toEqual({some: 'props'});
    });

    it('must delete bem lib props', function() {
        const props: Partial<BEMNodeProps> & {[key: string]: any} = {
            some: 'props',
            bemName: 'block',
            bemMod: [],
            className: 'class',
            bemBlock: 'overwrite'
        };

        const cleanProps: {[key: string]: any} = cleanUpProps(props);
        const keys: string[] = Object.keys(cleanProps);

        expect(keys).toContain('some');
        expect(keys).not.toContain('bemName');
        expect(keys).not.toContain('bemMod');
        expect(keys).not.toContain('className');
        expect(keys).not.toContain('bemBlock');
    });

});
