import React from 'react';

declare module "react-simple-bem" {
    export const BemSetting: BemSettingComponent;
    export const BemStyles: BemStylesComponent;
    export const Block: BemDefaultComponent;
    export function bemBlockDecorator(conponent: React.Component): BemComponent;
    export const Element: BemDefaultComponent;
    export function bemElementDecorator(conponent: React.Component): BemComponent;
}

type FunctionReturnBoolean = () => boolean;

type BemValueInObject = boolean | FunctionReturnBoolean;

type BemValue = string | string[] | { [key: string]: BemValueInObject };

interface BemComponentProps {
    children: React.ReactNode;
    bemName: BemValue,
    bemMod?: BemValue,
    bemBlock?: BemValue,
    className?: string,
}

interface BemComponent extends React.Component<BemComponentProps> {}

interface BemDefaultComponentProps extends BemComponentProps {
    tagName?: string;
}

interface BemDefaultComponent extends React.Component<BemDefaultComponentProps> {}

interface BemStylesComponentProps {
    styles: {
        [key: string]: string
    };
    children: React.ReactNode;
}

interface BemStylesComponent extends React.Component<BemStylesComponentProps> {}

interface BemSetting {
    elementDelimiter: string;
    modifierDelimiter: string;
    bemIndicationElement: RegExp;
    bemIndicationMod: RegExp;
    bemIndicationSeparator: string;
}

interface BemSettingComponentProps{
    bemSetting: BemSetting;
    children: React.ReactNode;
}

interface BemSettingComponent extends React.Component<BemSettingComponentProps> {}
