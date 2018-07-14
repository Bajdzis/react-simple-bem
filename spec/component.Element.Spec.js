/* global describe, it, expect */
import React from 'react';
import { mount } from 'enzyme';
import Block from '../src/Block';
import Element from '../src/Element';

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

});