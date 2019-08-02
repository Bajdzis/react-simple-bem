import * as PropTypes from 'prop-types'; 
import { BemValue, BemInfo, BemSetting, BemValueInObject } from './domain';

/**
 * Default setting
 */
export const DEFAULT_BEM_SETTING: BemSetting = {
    modifierDelimiter: '--',
    elementDelimiter: '__',
    bemIndicationElement: /:block\(([a-z]*)\)/gi,
    bemIndicationMod: /:element\(([a-z]*)\)/gi,
    bemIndicationSeparator: ':'
};

/**
 * Create class name with modifiers
 * @param {string} className 
 * @param {string[]} modifiers 
 * @param {object} setting 
 * @return {string[]}
 */
export function addModifiersToClassName(className: string, modifiers: string[] = [], setting: BemSetting = DEFAULT_BEM_SETTING): string[] {
    const [block, element]: string[] = className.split(setting.elementDelimiter);

    const modifiersName: string[] = modifiers
        .filter((modifier: string) => typeof modifier === 'string' && modifier.length)
        .map((modifier: string) => getStringBemInfo(modifier, setting))
        .filter((bemModifierInfo: BemInfo) => checkBemInfoCondition(bemModifierInfo, block, element))
        .map((bemModifierInfo: BemInfo) => `${className}${setting.modifierDelimiter}${bemModifierInfo.className}`);

    return [className, ...modifiersName];
}

/**
 * Test bemInfo values by blockName and elementName
 * @param {object} bemInfo
 * @param {string} block
 * @param {string} element
 * @return {bool}
 */
export function checkBemInfoCondition(bemInfo: BemInfo, block: string, element: string = ''): boolean {
    if (bemInfo.blocksName.length > 0 && bemInfo.blocksName.indexOf(block) === -1) {
        return false;
    }
    if (bemInfo.elementsName.length > 0 && bemInfo.elementsName.indexOf(element) === -1) {
        return false;
    }
    return true;

}
/**
 * Create class name with modifiers
 * @param {string} className 
 * @param {object} setting 
 * @return {object}
 */
export function getStringBemInfo(className: string, setting: BemSetting = DEFAULT_BEM_SETTING): BemInfo {
    const blocksName: string[] = [];
    const elementsName: string[] = [];
    const [onlyClassName]: string[] = className.split(setting.bemIndicationSeparator);
    let match: RegExpExecArray;
    // eslint-disable-next-line no-cond-assign
    while (match = setting.bemIndicationElement.exec(className)) {
        const [, blockName]: RegExpExecArray = match;
        blocksName.push(blockName);
    }
    // eslint-disable-next-line no-cond-assign
    while (match = setting.bemIndicationMod.exec(className)) {
        const [, elementName]: RegExpExecArray = match;
        elementsName.push(elementName);
    }
    return {
        className: onlyClassName,
        blocksName,
        elementsName
    };
}
/**
 * Converts many possible values to one format.
 * return empty array if bemValue is invalid
 * @param {string|object|string[]} bemValue 
 * @return {string[]} 
 */
export function convertBemValueToArray(bemValue: BemValue): string[] {

    if (typeof bemValue === 'string') {
        return bemValue.split(' ');
    }

    if (typeof bemValue === 'object') {

        if(bemValue === null){
            return [];
        }

        if(Array.isArray(bemValue)){
            return bemValue;
        }

        return Object.keys(bemValue)
            .filter((key: string) => {
                const value: BemValueInObject = bemValue[key];
                return typeof value === 'function' ? value() : value;
            });
    }

    return [];
}

/**
 * Delete from props many key before add to Html Element
 * @param {object} props 
 * @return {object}
 */
type ObjectWithAnyValue = {[key: string]: any};
export function cleanUpProps(props: ObjectWithAnyValue): ObjectWithAnyValue {
    props = {...props};

    delete props.bemName;
    delete props.bemMod;
    delete props.className;
    delete props.bemBlock;

    return props;
}

/**
 * Validator for bem value
 */
export const PropTypesBemValue: any = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object
]);

/**
 * Validator for bem setting
 */
export const PropTypesBemSetting: any = PropTypes.shape({
    elementDelimiter: PropTypes.string,
    modifierDelimiter: PropTypes.string,
    bemIndicationElement: PropTypes.object,//regex
    bemIndicationMod: PropTypes.object,//regex
    bemIndicationSeparator: PropTypes.string
});

