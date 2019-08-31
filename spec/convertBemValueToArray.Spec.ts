import {convertBemValueToArray} from '../src/helpers';
import { BemValue } from '../src/domain';

describe('Test convertBemValueToArray function', function() {

    it('must return itself array if you pass an array', function() {
        const bemValue: string[] = ['some', 'name'];

        const names: string[] = convertBemValueToArray(bemValue);

        expect(names).toBe(bemValue);
    });

    it('must always return array with strings', function() {
        type TestBemValues = {
            test:  BemValue,
            expect: string[]
        };

        const validBemValues: Array<TestBemValues> = [
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
                } as any as BemValue,
                expect: ['some', 'valid', 'one']
            },
            {
                test: {
                    funcTrue: () => (true),
                    funcFalse: () => (false),
                },
                expect: ['funcTrue']
            }
        ];

        validBemValues.forEach((value:TestBemValues) => {
            const names: string[] = convertBemValueToArray(value.test);
            expect(names).toEqual(value.expect);
        });
    });

    it('must return empty array on invalid type', function() {
        // @ts-ignore
        const invalidBemValues: BemValue[] = [true, false, 0, null, undefined];

        invalidBemValues.forEach((value: BemValue) => {
            const names: string[] = convertBemValueToArray(value);
            expect(names).toEqual([]);
        });
    });

});
