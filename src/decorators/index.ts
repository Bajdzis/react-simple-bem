import * as React from 'react';
import { BEMElementCreator } from './BEMElement';
import { BEMBlockCreator } from './BEMBlock';

export function bemBlockDecorator (Component: React.ElementType) {
    return BEMBlockCreator(Component);
}

export function bemElementDecorator (Component: React.ElementType) {
    return BEMElementCreator(Component);
}
