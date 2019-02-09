/* global describe, it, expect */
import React from 'react';
import { mount } from 'enzyme';
import { Block, Element } from '../index';
 
const clearWhiteSpace = (text) => text.replace(/\s/g, '');

describe('Output html', function() {

    it('no have redundant elements', function() {
        const elem = mount(<Block bemName="header">
            <Element bemName="button"/>
            <Element bemName="nav" tagName="nav">
                <Element bemName="link" tagName="a"/>
                <Element bemName="link" tagName="a"/>
            </Element>
        </Block>);
    
        const html = clearWhiteSpace(elem.html());
        const expectHtml = clearWhiteSpace(`<div class="header">
            <div class="header__button"></div>
            <nav class="header__nav">
                <a class="header__link"></a>
                <a class="header__link"></a>
            </nav>
        </div>`);

        expect(html).toEqual(expectHtml);
    });
});
