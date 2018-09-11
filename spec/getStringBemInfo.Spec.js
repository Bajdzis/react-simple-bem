/* global describe, it, expect */

import {getStringBemInfo} from '../src/helpers';

describe('Test getStringBemInfo function', function() {

    it('must generate object with correct className', function() {
        const blockName = 'nav';
        const elementName = 'nav__link';

        const infoBlock = getStringBemInfo(blockName);
        const infoElement = getStringBemInfo(elementName);

        expect(infoBlock.className).toEqual('nav');
        expect(infoElement.className).toEqual('nav__link');
    });


    it('must generate object with correct blocksName', function () {
        const modName = 'dark:block(nav)';
        const commonModName = 'dark:block(nav):block(header)';
        const blockName = 'nav';

        const infoMod = getStringBemInfo(modName);
        const infoBlock = getStringBemInfo(blockName);
        const infoCommonMod = getStringBemInfo(commonModName);

        expect(infoMod.blocksName).toEqual(['nav']);
        expect(infoCommonMod.blocksName).toEqual(['nav', 'header']);
        expect(infoBlock.blocksName).toEqual([]);
    });

    it('must generate object with correct elementsName', function () {
        const modName = 'dark:element(link):block(header)';
        const commonModName = 'dark:element(button):element(link)';
        const blockName = 'nav';

        const infoMod = getStringBemInfo(modName);
        const infoBlock = getStringBemInfo(blockName);
        const infoCommonMod = getStringBemInfo(commonModName);

        expect(infoMod.elementsName).toEqual(['link']);
        expect(infoCommonMod.elementsName).toEqual(['button', 'link']);
        expect(infoBlock.elementsName).toEqual([]);
    });

});

