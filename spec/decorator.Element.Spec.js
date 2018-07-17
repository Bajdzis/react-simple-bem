/* global describe, it, expect */
import React from 'react';
import {mount} from 'enzyme';
import {Block, bemElementDecorator} from '../index';

function CustomComponent(props) {
    // eslint-disable-next-line react/prop-types
    return <div className={props.className} />;
}

const BemCustomComponent = bemElementDecorator(CustomComponent);

describe('Test Element decorator', function() {

    it('must pass correct className to props and delete bem props', function() {
        const wrapper = mount(<Block bemName="header">
            <BemCustomComponent bemName="custom-element" bemMod="some-mod"/>
        </Block>);

        expect(wrapper.find(CustomComponent)).toHaveProp({className: 'header__custom-element header__custom-element--some-mod'});
        expect(wrapper.find(CustomComponent)).not.toHaveProp('bemName');
        expect(wrapper.find(CustomComponent)).not.toHaveProp('bemMod');
    });

});
