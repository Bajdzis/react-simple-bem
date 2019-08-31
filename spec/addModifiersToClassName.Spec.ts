import {addModifiersToClassName} from '../src/helpers';

describe('Test addModifiersToClassName function', function() {

    it('must generate string with modifiers', function() {
        const blockName: string = 'block';
        const modifiers: string[] = ['dark', 'big'];

        const className: string[] = addModifiersToClassName(blockName, modifiers);

        expect(className).toEqual(['block', 'block--dark', 'block--big']);
    });


    it('must generate string without invalid modifiers', function() {
        const blockName: string = 'block';
        // @ts-ignore
        const invalidModifiers: string[] = [true, false, 0, 1, {}, [], ''];

        const className: string[] = addModifiersToClassName(blockName, invalidModifiers);

        expect(className).toEqual(['block']);
    });

    it('must generate correct mixed modifiers classNames', function() {
        const blockName: string = 'blockName';
        const modifiers: string[] = ['dark:block(header)', 'big:block(blockName)', 'common:block(header):block(blockName)'];

        const className: string[] = addModifiersToClassName(blockName, modifiers);

        expect(className).toEqual(['blockName', 'blockName--big', 'blockName--common']);
    });

});

