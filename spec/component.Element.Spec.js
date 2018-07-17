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

});
