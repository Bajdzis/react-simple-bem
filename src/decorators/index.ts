import * as React from 'react';
import { BEMElement } from './BEMElement';
import { BEMBlock } from './BEMBlock';

export function bemBlockDecorator (Component: React.ElementType) {
    return (
        class BemDecoratorComponent extends BEMBlock {
            render() {
                // @ts-ignore
                return super.render(Component);
            }
        }
    );
}

export function bemElementDecorator (Component: React.ElementType) {
    return(
        class BemDecoratorComponent extends BEMElement {
            render() {
                // @ts-ignore
                return super.render(Component);
            }
        }
    );
}
