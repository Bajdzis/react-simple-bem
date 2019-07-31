import * as PropTypes from 'prop-types'; 
import { BemValue, BemInfo } from './domain';

/**
 * Default setting
 */
export const DEFAULT_BEM_SETTING = {
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
export function addModifiersToClassName(className: string, modifiers: string[] = [], setting = DEFAULT_BEM_SETTING): string[] {
    const [block, element] = className.split(setting.elementDelimiter);

    const modifiersName = modifiers
        .filter(modifier => typeof modifier === 'string' && modifier.length)
        .map((modifier) => getStringBemInfo(modifier, setting))
        .filter((bemModifierInfo) => checkBemInfoCondition(bemModifierInfo, block, element))
        .map((bemModifierInfo) => `${className}${setting.modifierDelimiter}${bemModifierInfo.className}`);

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
export function getStringBemInfo(className: string, setting = DEFAULT_BEM_SETTING): BemInfo {
    const blocksName = [];
    const elementsName = [];
    const [onlyClassName] = className.split(setting.bemIndicationSeparator);
    let match;
    // eslint-disable-next-line no-cond-assign
    while (match = setting.bemIndicationElement.exec(className)) {
        const [, blockName] = match;
        blocksName.push(blockName);
    }
    // eslint-disable-next-line no-cond-assign
    while (match = setting.bemIndicationMod.exec(className)) {
        const [, elementName] = match;
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
            .filter(key => {
                const value = bemValue[key];
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
export const PropTypesBemValue = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object
]);

/**
 * Validator for bem setting
 */
export const PropTypesBemSetting = PropTypes.shape({
    elementDelimiter: PropTypes.string,
    modifierDelimiter: PropTypes.string,
    bemIndicationElement: PropTypes.object,//regex
    bemIndicationMod: PropTypes.object,//regex
    bemIndicationSeparator: PropTypes.string
});

