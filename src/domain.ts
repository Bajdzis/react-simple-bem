
export type FunctionReturnBoolean = () => boolean;

export type BemValueInObject = boolean | FunctionReturnBoolean;

export type BemValue = string | string[] | { [key: string]: BemValueInObject };

export type BemSettingI = {
    elementDelimiter: string;
    modifierDelimiter: string;
    bemIndicationElement: RegExp;
    bemIndicationMod: RegExp;
    bemIndicationSeparator: string;
};

export type BemInfo = {
    className: string,
    blocksName: string[],
    elementsName: string[]
}
