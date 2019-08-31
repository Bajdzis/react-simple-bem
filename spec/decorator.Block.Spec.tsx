import * as React from 'react';
import {mount, ReactWrapper} from 'enzyme';
import {Element, bemBlockDecorator} from '../index';
import {BEMBlock} from '../src/decorators/BEMBlock';

const DEFAULT_TAG_NAME: string = 'div';

function CustomComponent(props: {className : string}): React.ReactElement {
    // eslint-disable-next-line react/prop-types
    return <h1 className={props.className}>
        <Element bemName="icon" />
    </h1>;
}

const BemCustomComponent: typeof BEMBlock = bemBlockDecorator(CustomComponent);

describe('Test Block decorator', function() {

    it('must pass correct className to props and delete bem props', function() {
        const wrapper: ReactWrapper = mount(<BemCustomComponent bemName="header" bemMod="some-mod"/>);

        expect(wrapper.find(CustomComponent)).toHaveProp('className', 'header header--some-mod');
        expect(wrapper.find(CustomComponent)).not.toHaveProp('bemName');
        expect(wrapper.find(CustomComponent)).not.toHaveProp('bemMod');
    });

    it('must pass block name to component Element', function() {
        const wrapper: ReactWrapper = mount(<BemCustomComponent bemName="header"/>);

        expect(wrapper.find(Element)).toExist();
        expect(wrapper.find(Element).find(DEFAULT_TAG_NAME)).toHaveClassName('header__icon');
    });

});
