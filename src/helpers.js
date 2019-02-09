import PropTypes from 'prop-types'; 

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
export function addModifiersToClassName(className, modifiers = [], setting = DEFAULT_BEM_SETTING) {
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
export function checkBemInfoCondition(bemInfo, block, element = ''){
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
export function getStringBemInfo(className, setting = DEFAULT_BEM_SETTING) {
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
export function convertBemValueToArray(bemValue){
    const type = typeof bemValue;

    if(type === 'string'){
        return bemValue.split(' ');
    }

    if(type === 'object'){

        if(bemValue === null){
            return [];
        }

        if(Array.isArray(bemValue)){
            return bemValue;
        }

        return Object.keys(bemValue)
            .filter(key => typeof bemValue[key] === 'function' ? bemValue[key]() : bemValue[key]);
    }

    return [];
}

/**
 * Delete from props many key before add to Html Element
 * @param {object} props 
 * @return {object}
 */
export function cleanUpProps(props){
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

