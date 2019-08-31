import * as React from 'react';
import { BEMElement } from './BEMElement';
import { BEMBlock } from './BEMBlock';

export function bemBlockDecorator (Component: typeof React.Component) {
    return (
        class BemDecoratorComponent extends BEMBlock {
            render() {
                return super.render(Component);
            }
        }
    );
}

export function bemElementDecorator (Component: typeof React.Component) {
    return(
        class BemDecoratorComponent extends BEMElement {
            render() {
                return super.render(Component);
            }
        }
    );
}
