import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Block, Element } from '../index';

describe('Output html', function() {

    function clearWhiteSpace (text: string): string {
        return text.replace(/\s/g, '');
    }

    it('no have redundant elements', function() {
        const elem: ReactWrapper = mount(<Block bemName="header">
            <Element bemName="button"/>
            <Element bemName="nav" tagName="nav">
                <Element bemName="link" tagName="a"/>
                <Element bemName="link" tagName="a"/>
            </Element>
        </Block>);
    
        const html: string = clearWhiteSpace(elem.html());
        const expectHtml: string = clearWhiteSpace(`<div class="header">
            <div class="header__button"></div>
            <nav class="header__nav">
                <a class="header__link"></a>
                <a class="header__link"></a>
            </nav>
        </div>`);

        expect(html).toEqual(expectHtml);
    });
});
