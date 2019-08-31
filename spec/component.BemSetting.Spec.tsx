import * as React from 'react';
import {mount, ReactWrapper} from 'enzyme';
import {Block, Element, BemSetting} from '../index';

describe('Test BemSetting Component', function() {

    it('must change only modifier delimiter', function() {
        const setting: BemSetting = {
            modifierDelimiter: '_M-'
        } as Partial<BemSetting> as BemSetting;

        const wrapper: ReactWrapper = mount(<BemSetting bemSetting={setting}>
            <Block id="block_header" bemName="header" bemMod="mod">
                <Element id="element_menu" bemName="menu" bemMod="mod"/>
            </Block>
        </BemSetting>);

        expect(wrapper.find('div#block_header')).toHaveClassName('header_M-mod');
        expect(wrapper.find('div#block_header')).not.toHaveClassName('header--mod');
        expect(wrapper.find('div#element_menu')).toHaveClassName('header__menu_M-mod');
        expect(wrapper.find('div#element_menu')).not.toHaveClassName('header__menu--mod');
    });

    it('must change only element delimiter', function() {
        const setting:BemSetting = {
            elementDelimiter: '_E-'
        } as Partial<BemSetting> as BemSetting;

        const wrapper: ReactWrapper = mount(<BemSetting bemSetting={setting}>
            <Block id="block_header" bemName="header" bemMod="mod">
                <Element id="element_menu" bemName="menu" bemMod="mod"/>
            </Block>
        </BemSetting>);

        expect(wrapper.find('div#block_header')).toHaveClassName('header--mod');
        expect(wrapper.find('div#element_menu')).toHaveClassName('header_E-menu--mod');
        expect(wrapper.find('div#element_menu')).not.toHaveClassName('header__menu--mod');
    });

    it('must support nesting BemSetting Component', function() {
        const wrapper: ReactWrapper = mount(<BemSetting bemSetting={{
            elementDelimiter: '_E-'
        }as Partial<BemSetting> as BemSetting}>
            <BemSetting bemSetting={{
                modifierDelimiter: '_M-'
            }as Partial<BemSetting> as BemSetting}>
                <Block id="block_header" bemName="header" bemMod="mod">
                    <Element id="element_menu" bemName="menu" bemMod="mod"/>
                </Block>
            </BemSetting>
        </BemSetting>);

        expect(wrapper.find('div#block_header')).toHaveClassName('header_M-mod');
        expect(wrapper.find('div#block_header')).not.toHaveClassName('header--mod');
        expect(wrapper.find('div#element_menu')).toHaveClassName('header_E-menu_M-mod');
        expect(wrapper.find('div#element_menu')).not.toHaveClassName('header__menu--mod');
    });

});
