/* global describe, it, expect */

import {addModifiersToClassName} from '../src/helpers';

describe('Test addModifiersToClassName function', function() {

    it('must generate string with modifiers', function() {
        const blockName = 'block';
        const modifiers = ['dark', 'big'];

        const className = addModifiersToClassName(blockName, modifiers);

        expect(className).toEqual('block block--dark block--big');
    });


    it('must generate string without invalid modifiers', function() {
        const blockName = 'block';
        const invalidModifiers = [true, false, 0, 1, {}, [], ''];

        const className = addModifiersToClassName(blockName, invalidModifiers);

        expect(className).toEqual('block');
    });

});

