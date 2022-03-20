import * as React from 'react';
import {mount, ReactWrapper} from 'enzyme';
import {Block, bemElementDecorator} from '../index';
import { BEMNodeProps } from '../src/decorators/BEMNode';

function CustomComponent(props: {className : string}): React.ReactElement {
    return <div className={props.className} />;
}

const BemCustomComponent: React.FC<BEMNodeProps> = bemElementDecorator(CustomComponent);

describe('Test Element decorator', function() {

    it('must pass correct className to props and delete bem props', function() {
        const wrapper: ReactWrapper = mount(<Block bemName="header">
            <BemCustomComponent bemName="custom-element" bemMod="some-mod"/>
        </Block>);

        expect(wrapper.find(CustomComponent)).toHaveProp('className', 'header__custom-element header__custom-element--some-mod');
        expect(wrapper.find(CustomComponent)).not.toHaveProp('bemName');
        expect(wrapper.find(CustomComponent)).not.toHaveProp('bemMod');
    });

});
