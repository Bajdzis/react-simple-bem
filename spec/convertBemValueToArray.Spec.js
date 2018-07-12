/* global describe, it, expect */

import {addModifiersToClassName} from '../src/helpers';

describe('Test addModifiersToClassName', function() {

    it('must generate string with modifiers', function() {
        const className = addModifiersToClassName('block', ['dark', 'big']);

        expect(className).toEqual('block block--dark block--big');
    });

});
