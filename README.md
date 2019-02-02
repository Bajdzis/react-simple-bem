# react-simple-bem
Library for easier use of BEM methodology in React JS

## Install

```
npm i react-simple-bem --save
```

## How to use 

```jsx
import React from 'react';
import {Block, Element} from 'react-simple-bem';

class SomeComponent extends React.Component {
    render() {
        return (
            <Block bemName="header" bemMod="dark" className="not-bem-class">
                <Element bemName="logo">
                    [...]
                </Element>
                <Element bemName="menu" bemMod={['special', 'awesome']} tagName="nav">
                    [...]
                </Element>
            </Block>
        );
    }
};
```
### output :

The Element component automatically retrieves the name of its block.

```html
<div class="header header--dark not-bem-class">
    <div class="header__logo">
        [...]
    </div>
    <nav class="header__menu header__menu--special header__menu--awesome">
        [...]
    </nav>
</div>
```

## Correct values for props bemName and bemMod

Type | React (JSX) | Output (HTML)
--- | --- | ---
string | `<Block bemName="header" bemMod="dark" />` | `<div class="header header--dark">`
string with space | `<Block bemName="header" bemMod="dark big" />` | `<div class="header header--dark header--big">`
array | `<Block bemName="header" bemMod={['dark', 'big']} />` | `<div class="header header--dark header--big">`
object (recommended for conditions) | `<Block bemName="header" bemMod={{'dark': true, 'big': false}} />` | `<div class="header header--dark">`
object with function as value | `<Block bemName="header" bemMod={{'dark': () => true, 'big': () => false}} />` | `<div class="header header--dark">`


## Using with modules styles loader

```jsx
import React from 'react';
import {Block, Element, BemStyles} from 'react-simple-bem';
import modulesStyles from 'style.scss'; // {header : 'header_08c6a5', header__logo : 'header__logo_08c6a5'}

class SomeComponent extends React.Component {
    render() {
        return (
            <BemStyles styles={modulesStyles}>
                <Block bemName="header">
                    <Element bemName="logo" />
                </Block>
            </BemStyles>
        );
    }
};
```
### output :

```html
<div class="header_08c6a5">
    <div class="header__logo_08c6a5"></div>
</div>
```

## Settings

Name | Type | Default
--- | --- | ---
elementDelimiter | string | `__`
modifierDelimiter | string | `--`
bemIndicationMod | RegEx |  `/:element\(([a-z]*)\)/gi`
bemIndicationElement | RegEx | `/:block\(([a-z]*)\)/gi`
bemIndicationSeparator | string |  `:`

### Change setting with BemSetting Component

```jsx
import React from 'react';
import {Block, Element, BemSetting} from 'react-simple-bem';

const setting = {
    modifierDelimiter: '-mod-',
    elementDelimiter: '_ele_'
}

class SomeComponent extends React.Component {
    render() {
        return (
            <BemSetting bemSetting={setting}>
                <Block bemName="header" bemMod="dark">
                    <Element bemName="logo" bemMod="big" />
                </Block>
            </BemSetting>
        );
    }
};
```
### output :

```html
<div class="header header-mod-dark">
    <div class="header_ele_logo header_ele_logo-mod-big"></div>
</div>
```

## Using ref

If you want to get HTMLElement use forwardedRef properties.

```jsx
import React from 'react';
import {Block, Element} from 'react-simple-bem';

function SomeComponent() {
    return (
        <Block 
            bemName="header" 
            forwardedRef={ref => console.log('header ref is', ref)} 
        >
            <Element 
                bemName="logo" 
                forwardedRef={ref => console.log('logo ref is', ref)} 
            />
        </Block>
    );
}

```

## Mixed block name and modifiers

```jsx
import React from 'react';
import {Block, Element} from 'react-simple-bem';

class SomeComponent extends React.Component {
    render() {
        return (
            <Block bemName="header body">
                <Element bemName="logo" bemBlock="some other"/>
                <Element bemName="nav" bemMod="dark"/>
                <Element bemName="nav" bemMod="dark:block(header)"/>
                <Element 
                    bemName="logo:block(header) link:block(body)" 
                    bemBlock="hover:element(link) other:element(logo)"
                />
            </Block>
        );
    }
};
```

### output :

```html
<div class="header">
    <div class="some__logo other__logo"></div>
    <div class="header__nav body__nav header__nav--dark body__nav--dark"></div>
    <div class="some__logo other__logo header__nav--dark"></div>
    <div class="header__logo body__link body__link--hover header__logo--other"></div>
</div>
```

## Custom component

You can create your own component of a `<Block>` or `<Element>`. 
To do this you must use the function `bemElementDecorator()` or `bemBlockDecorator()`.

```jsx
import React from 'react';
import {Element, bemBlockDecorator} from 'react-simple-bem';

function CustomBlockComponent(props) {
    return <h1 className={props.className}>
        <Element bemName="icon" />{props.title}
    </h1>;
}

export default bemBlockDecorator(CustomBlockComponent);
```

### using : 

```jsx
import React from 'react';
import CustomBlockComponent from './CustomBlockComponent';

class SomeComponent extends React.Component {
    render() {
        return (
            <CustomBlockComponent bemName="header" bemMod="dark" title="some title"/>
        );
    }
};
```

### output :
```html
<h1 class="header header--dark">
    <div class="header__icon"></div>some title
</h1>
```
