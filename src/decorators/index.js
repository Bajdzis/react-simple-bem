import { BEMElement } from './BEMElement';
import { BEMBlock } from './BEMBlock';

export const bemBlockDecorator = (Component) => (
    class BemDecoratorComponent extends BEMBlock {
        render() {
            return super.render(Component);
        }
    }
);

export const bemElementDecorator = (Component) => (
    class BemDecoratorComponent extends BEMElement {
        render() {
            return super.render(Component);
        }
    }
);
