import * as React from 'react';
import {mount, ReactWrapper} from 'enzyme';
import {Block, Element, BemStyles} from '../index';

const modulesCssStyles: {[key: string]: string} = {
    'header': 'header_08c6a5',
    'header--dark': 'header--dark_08c6a5',
    'header--big': 'header--big_08c6a5',
    'header__menu': 'header__menu_08c6a5',
    'header__menu--big': 'header__menu--big_08c6a5',
};

describe('Test BemStyles Component', function() {

    it('must replace Block Component className with module className', function() {
        const wrapper: ReactWrapper = mount(<BemStyles styles={modulesCssStyles}>
            <Block id="block_header" bemName="header"/>
        </BemStyles>);

        expect(wrapper.find('div#block_header')).toHaveClassName(modulesCssStyles['header']);
    });


    it('must replace Element Component className with module className', function() {
        const wrapper: ReactWrapper = mount(<BemStyles styles={modulesCssStyles}>
            <Block bemName="header">
                <Element id="element_menu" bemName="menu"/>
            </Block>
        </BemStyles>);

        expect(wrapper.find('div#element_menu')).toHaveClassName(modulesCssStyles['header__menu']);
    });

});
