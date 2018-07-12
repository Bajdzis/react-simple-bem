/* global describe, it, expect */

import {convertBemValueToArray} from '../src/helpers';

describe('Test convertBemValueToArray', function() {

    it('String without space must return array with one string', function() {
        const bemValue = 'some-name';

        const names = convertBemValueToArray(bemValue);

        expect(names).toEqual(['some-name']);
    });

    it('String separate by space must return array of string', function() {
        const bemValue = 'some name with space';

        const names = convertBemValueToArray(bemValue);

        expect(names).toEqual(['some', 'name', 'with', 'space']);
    });

    it('Object must return array with keys from object', function() {
        const bemValue = {
            some: 'value',
            other: 'value'
        };

        const names = convertBemValueToArray(bemValue);

        expect(names).toEqual(['some', 'other']);
    });

    it('Object must delete key if value project to false', function() {
        const bemValue = {
            valid: true,
            dark: null,
            light: false,
            empty: '',
        };

        const names = convertBemValueToArray(bemValue);

        expect(names).toEqual(['valid']);
    });

    it('Array must return itself', function() {
        const bemValue = ['some', 'name'];

        const names = convertBemValueToArray(bemValue);

        expect(names).toBe(bemValue);
    });

    it('invalid type return empty array', function() {
        const bemValue = false;

        const names = convertBemValueToArray(bemValue);

        expect(names).toEqual([]);
    });

});
