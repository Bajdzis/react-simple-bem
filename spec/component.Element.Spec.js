/* global describe, it, expect */
import React from 'react';
import { mount } from 'enzyme';
import {Block, Element} from '../index';

describe('Test Element Component', function() {

    it('must retrieves block name', function() {
        const wrapper = mount(<Block bemName="header">
            <Element id="element_logo" bemName="logo"/>
        </Block>);

        expect(wrapper.find('div#element_logo')).toHaveClassName('header__logo');
    });

    it('must render additional className without BEM methodology', function() {
        const wrapper = mount(<Block bemName="header">
            <Element id="element_logo" bemName="logo" className="not-bem-class"/>
        </Block>);

        expect(wrapper.find('div#element_logo')).toHaveClassName('header__logo');
        expect(wrapper.find('div#element_logo')).toHaveClassName('not-bem-class');
    });

    it('must be able to overwrite block name', function() {
        const wrapper = mount(<Block bemName="header">
            <Element id="element_logo" bemName="logo" bemBlock="other-block"/>
        </Block>);

        expect(wrapper.find('div#element_logo')).toHaveClassName('other-block__logo');
    });

    it('must be generate elementName by multi blockName', function () {
        const wrapper = mount(<Block bemName="header nav">
            <Element id="element_logo" bemName="logo" />
        </Block>);

        expect(wrapper.find('div#element_logo')).toHaveClassName('header__logo nav__logo');
    });

    it('must generate correct mixed modifiers classNames', function () {
        const blockNames = 'header nav';
        const mods = ['menu:block(header)', 'element:block(nav)', 'common:block(header):block(nav)'];

        const wrapper = mount(<Block bemName={blockNames} >
            <Element id="element_logo" bemName="link" bemMod={mods}/>
        </Block>);

        expect(wrapper.find('div#element_logo'))
            .toHaveClassName('header__link nav__link header__link--menu nav__link--element header__link--common nav__link--common');
    });

    it('must generate correct mixed elements classNames', function () {
        const blockNames = 'header nav';
        const elements = ['menu:block(header)', 'element:block(nav)', 'common:block(header):block(nav)'];

        const wrapper = mount(<Block bemName={blockNames} >
            <Element id="element_logo" bemName={elements}/>
        </Block>);

        expect(wrapper.find('div#element_logo')).toHaveClassName('header__menu nav__element header__common nav__common');
        expect(wrapper.find('div#element_logo')).not.toHaveClassName('nav__menu header__element');
    });

    it('must generate correct mixed modifiers classNames', function () {
        const mods = ['hover:element(link)', 'primary:element(button)', 'disable:block(header):element(button)'];

        const wrapper = mount(<Block bemName="header nav">
            <Element id="element_logo" bemName="link button" bemMod={mods}/>
        </Block>);

        expect(wrapper.find('div#element_logo')).toHaveClassName('header__link header__button header__link--hover header__button--primary header__button--disable');
        expect(wrapper.find('div#element_logo')).not.toHaveClassName('nav__button--disable header__link--primary header__button--hover');
    });

    it('must return DOM node element in forwardedRef callback', function () {
        let DOMElement = null;
        mount(<Block bemName="header">
            <Element forwardedRef={(ref) => DOMElement = ref} bemName="button"/>
        </Block>);
    
        expect(DOMElement.constructor.name).toEqual('HTMLDivElement');
    });

});
