/* global describe, it, expect */
import React from 'react';
import {mount} from 'enzyme';
import {Element, bemBlockDecorator} from '../index';

const DEFAULT_TAG_NAME = 'div';

function CustomComponent(props) {
    // eslint-disable-next-line react/prop-types
    return <h1 className={props.className}>
        <Element bemName="icon" />
    </h1>;
}

const BemCustomComponent = bemBlockDecorator(CustomComponent);

describe('Test Block decorator', function() {

    it('must pass correct className to props and delete bem props', function() {
        const wrapper = mount(<BemCustomComponent bemName="header" bemMod="some-mod"/>);

        expect(wrapper.find(CustomComponent)).toHaveProp({className: 'header header--some-mod'});
        expect(wrapper.find(CustomComponent)).not.toHaveProp('bemName');
        expect(wrapper.find(CustomComponent)).not.toHaveProp('bemMod');
    });

    it('must pass block name to component Element', function() {
        const wrapper = mount(<BemCustomComponent bemName="header"/>);

        expect(wrapper.find(Element)).toExist();
        expect(wrapper.find(Element).find(DEFAULT_TAG_NAME)).toHaveClassName('header__icon');
    });

});
