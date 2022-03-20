import * as React from 'react';
import { addModifiersToClassName, convertBemValueToArray, cleanUpProps} from '../helpers';
import { BemValue, BemSettingI } from '../domain';
import {  BEMSettingContext, BEMStyleContext } from '../context/settings';

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

export interface BEMNodeContextI {
    BEM_BlockNames: string[],
}

export interface BEMStyleContextI {
    BEM_StylesObject: {[key:string]: string} | null,
}

export const BEMNodeCreator: (Component: React.ElementType) => React.FC<BEMNodeProps> = (Component: React.ElementType) => function BEMNode ({forwardedRef, getNames,  ...props}:BEMNodeProps) {
    const setting:BemSettingI = React.useContext(BEMSettingContext);
    const { BEM_StylesObject }:BEMStyleContextI = React.useContext(BEMStyleContext);

    function getMods(): string[] {
        return convertBemValueToArray(props.bemMod);
    }

    function getClassName(setting: BemSettingI): string[] {
        if(!getNames){
            throw new Error('getNames not implement');
        }
        const names: string[] = getNames();
        const mods: string[] = getMods();
        const classNames: string[] = [];
        names.forEach((name: string) => classNames.push(...addModifiersToClassName(name, mods, setting)));
        if(props.className){
            classNames.push(props.className);
        }
        return classNames;
    }

    function replaceModulesStyles(classNames: string[]): string[]{
        if(!BEM_StylesObject){
            return classNames;
        }
        return classNames.map((className: string) => BEM_StylesObject[className] || className);
    }

    const className: string = replaceModulesStyles(getClassName(setting)).join(' ');

    return (
        <Component className={className} forwardedRef={forwardedRef} {...cleanUpProps(props)}>
            {props.children}
        </Component>
    );
};
