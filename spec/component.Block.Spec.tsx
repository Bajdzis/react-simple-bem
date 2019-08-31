import * as React from 'react';
import {shallow, mount, ShallowWrapper, ReactWrapper} from 'enzyme';
import {Block} from '../index';

describe('Test Block Component', function() {

    it('must render correct className and default tagName', function() {
        const wrapper: ReactWrapper = mount(<Block bemName="header"/>);

        expect(wrapper.getDOMNode().className).toEqual('header');
        expect(wrapper.getDOMNode().tagName).toEqual('DIV');
        expect(wrapper.html()).toEqual('<div class="header"></div>');
    });

    it('must render additional className without BEM methodology', function() {
        const wrapper: ShallowWrapper = shallow(<Block bemName="header" className="not-bem-class"/>);

        expect(wrapper).toHaveClassName('header');
        expect(wrapper).toHaveClassName('not-bem-class');
    });

    it('must render custom tagName', function() {
        const wrapper: ReactWrapper = mount(<Block bemName="header" tagName="span"/>);

        expect(wrapper.getDOMNode().className).toEqual('header');
        expect(wrapper.getDOMNode().tagName).toEqual('SPAN');
        expect(wrapper.html()).toEqual('<span class="header"></span>');
    });

    it('must render className with modifiers', function() {
        const wrapper: ShallowWrapper = shallow(<Block bemName="header" bemMod="dark big"/>);

        expect(wrapper).toHaveClassName('header header--dark header--big');
    });

    it('must generate correct mixed modifiers classNames', function () {
        const blockNames: string = 'header nav';
        const elements: string[] = ['dark:block(header)', 'focus:block(nav)', 'common:block(header):block(nav)'];

        const wrapper: ReactWrapper = mount(<Block id="element_logo" bemName={blockNames} bemMod={elements}></Block>);

        expect(wrapper.find('div#element_logo')).toHaveClassName('header--dark nav--focus header--common nav--common');
        expect(wrapper.find('div#element_logo')).not.toHaveClassName('nav--dark header--focus');
    });

    it('must return DOM node element in forwardedRef callback', function () {
        let DOMElement: HTMLElement = null;
        mount(<Block bemName="" forwardedRef={(ref:HTMLElement) => { DOMElement = ref; }} />);
    
        // @ts-ignore
        expect(DOMElement.constructor.name).toEqual('HTMLDivElement');
    });

});
