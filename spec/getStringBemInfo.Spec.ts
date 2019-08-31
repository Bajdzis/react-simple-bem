import {getStringBemInfo} from '../src/helpers';
import { BemInfo } from '../src/domain';

describe('Test getStringBemInfo function', function() {

    it('must generate object with correct className', function() {
        const blockName: string = 'nav';
        const elementName: string = 'nav__link';

        const infoBlock: BemInfo = getStringBemInfo(blockName);
        const infoElement: BemInfo = getStringBemInfo(elementName);

        expect(infoBlock.className).toEqual('nav');
        expect(infoElement.className).toEqual('nav__link');
    });


    it('must generate object with correct blocksName', function () {
        const modName: string = 'dark:block(nav)';
        const commonModName: string = 'dark:block(nav):block(header)';
        const blockName: string = 'nav';

        const infoMod: BemInfo = getStringBemInfo(modName);
        const infoBlock: BemInfo = getStringBemInfo(blockName);
        const infoCommonMod: BemInfo = getStringBemInfo(commonModName);

        expect(infoMod.blocksName).toEqual(['nav']);
        expect(infoCommonMod.blocksName).toEqual(['nav', 'header']);
        expect(infoBlock.blocksName).toEqual([]);
    });

    it('must generate object with correct elementsName', function () {
        const modName: string = 'dark:element(link):block(header)';
        const commonModName: string = 'dark:element(button):element(link)';
        const blockName: string = 'nav';

        const infoMod: BemInfo = getStringBemInfo(modName);
        const infoBlock: BemInfo = getStringBemInfo(blockName);
        const infoCommonMod: BemInfo = getStringBemInfo(commonModName);

        expect(infoMod.elementsName).toEqual(['link']);
        expect(infoCommonMod.elementsName).toEqual(['button', 'link']);
        expect(infoBlock.elementsName).toEqual([]);
    });

});

