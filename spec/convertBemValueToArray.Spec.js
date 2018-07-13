
/* global describe, it, expect */

import {convertBemValueToArray} from '../src/helpers';

describe('Test convertBemValueToArray function', function() {

    it('must return itself array', function() {
        const bemValue = ['some', 'name'];

        const names = convertBemValueToArray(bemValue);

        expect(names).toBe(bemValue);
    });

    it('must always return array with strings', function() {
        const validBemValues = [
            {
                test: 'some-name',
                expect: ['some-name']
            },
            {
                test: 'some name with space',
                expect: ['some', 'name', 'with', 'space']
            },
            {
                test: {
                    some: 'string',
                    valid: true,
                    dark: null,
                    light: false,
                    empty: '',
                    zero: 0,
                    one: 1
                },
                expect: ['some', 'valid', 'one']
            }
        ];

        validBemValues.forEach(value => {
            const names = convertBemValueToArray(value.test);
            expect(names).toEqual(value.expect);
        });
    });

    it('must return empty array on invalid type', function() {
        const invalidBemValues = [true, false, 0, null, undefined];

        invalidBemValues.forEach(value => {
            const names = convertBemValueToArray(value);
            expect(names).toEqual([]);
        });
    });

});
