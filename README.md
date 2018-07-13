# react-simple-bem
Library for easier use BEM methodology in React JS

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
            <Block bemName="header" bemMod="dark">
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

```html
<div class="header header--dark">
    <div class="header__logo">
        [...]
    </div>
    <nav class="header__menu header__menu--special header__menu--awesome">
        [...]
    </nav>
</div>
```

The Element component automatically retrieves the name of its block.


### Correct values for props bemName and bemMod


Type | React (JSX) | Output (HTML)
--- | --- | ---
string | `<Block bemName="header" bemMod="dark" />` | `<div class="header header--dark">`
string with space | `<Block bemName="header" bemMod="dark big" />` | `<div class="header header--dark header--big">`
array | `<Block bemName="header" bemMod={['dark', 'big']} />` | `<div class="header header--dark header--big">`
object (recommended for condition) | `<Block bemName="header" bemMod={{'dark': true, 'big': false}} />` | `<div class="header header--dark">`