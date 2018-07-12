import PropTypes from 'prop-types'; 

/**
 * Create class name with modifiers
 * @param {string} className 
 * @param {string[]} modifiers 
 * @return {string}
 */
export function addModifiersToClassName(className, modifiers = []) {
    const modifiersName = modifiers
        .filter((modifier) => typeof modifier === 'string' && modifier.length > 0)
        .map((modifier) => `${className}--${modifier}`)
        .join(' ');
    return `${className} ${modifiersName}`;
}

/**
 * Converts many possible values to one format.
 * @param {string|object|string[]} bemValue 
 * @return {string[]}
 */
export function convertBemValueToArray(bemValue){
    const type = typeof bemValue;

    if(type === 'string'){
        return bemValue.split(' ');
    }

    if(Array.isArray(bemValue)){
        return bemValue;
    }

    if(type === 'object'){
        return Object.keys(bemValue).filter(key => bemValue[key]);
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
    delete props.tagName;

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
