/* global describe, it, expect */
import React from 'react';
import {mount} from 'enzyme';
import Block from '../src/Block';
import Element from '../src/Element';
import BemSetting from '../src/BemSetting';

describe('Test BemSetting Component', function() {

    it('must change only modifier delimiter', function() {
        const wrapper = mount(<BemSetting bemSetting={{
            modifierDelimiter: '_M-'
        }}>
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
        const wrapper = mount(<BemSetting bemSetting={{
            elementDelimiter: '_E-'
        }}>
            <Block id="block_header" bemName="header" bemMod="mod">
                <Element id="element_menu" bemName="menu" bemMod="mod"/>
            </Block>
        </BemSetting>);

        expect(wrapper.find('div#block_header')).toHaveClassName('header--mod');
        expect(wrapper.find('div#element_menu')).toHaveClassName('header_E-menu--mod');
        expect(wrapper.find('div#element_menu')).not.toHaveClassName('header__menu--mod');
    });


    it('must support nesting BemSetting Component', function() {
        const wrapper = mount(<BemSetting bemSetting={{
            elementDelimiter: '_E-'
        }}>
            <BemSetting bemSetting={{
                modifierDelimiter: '_M-'
            }}>
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
