import * as React from 'react';
import { addModifiersToClassName, convertBemValueToArray } from '../helpers';
import { BemValue, BemSettingI } from '../domain';
import { BEMSettingContext, BEMStyleContext } from '../context/settings';

export interface BEMNodeProps {
    bemName: BemValue,
    bemMod?: BemValue,
    bemBlock?: BemValue,
    className?: string,
    children?: React.ReactNode,
    forwardedRef?: (ref: HTMLElement | null) => void;
    [key: string]: any;
    getNames?: (() => string[]) | undefined;
}

export type BEMNodeContextI = string[];

export type BEMStyleContextI = { [key: string]: string } | null

export const BEMNodeCreator: (Component: React.ElementType) => React.FC<BEMNodeProps> = (Component: React.ElementType) => function BEMNode({
    forwardedRef,
    getNames,
    bemMod,
    className,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    bemName,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    bemBlock,
    ...props
}: BEMNodeProps) {
    const setting: BemSettingI = React.useContext(BEMSettingContext);
    const stylesObject: BEMStyleContextI = React.useContext(BEMStyleContext);

    function getClassName(setting: BemSettingI): string[] {
        if (!getNames) {
            throw new Error('getNames not implement');
        }
        const names: string[] = getNames();
        const mods: string[] = convertBemValueToArray(bemMod);
        const classNames: string[] = [];
        names.forEach((name: string) => classNames.push(...addModifiersToClassName(name, mods, setting)));
        if (className) {
            classNames.push(className);
        }
        return classNames;
    }

    function replaceModulesStyles(classNames: string[]): string[] {
        if (!stylesObject) {
            return classNames;
        }
        return classNames.map((className: string) => stylesObject[className] || className);
    }

    const classNameWithBem: string = replaceModulesStyles(getClassName(setting)).join(' ');

    return (
        <Component className={classNameWithBem} forwardedRef={forwardedRef} {...props} />
    );
};
