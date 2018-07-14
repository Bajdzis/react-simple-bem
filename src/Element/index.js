import React from 'react';
import PropTypes from 'prop-types'; 
import {addModifiersToClassName, convertBemValueToArray, PropTypesBemValue, cleanUpProps} from '../helpers';

export default class Element extends React.Component {

    getMods() {
        return convertBemValueToArray(this.props.bemMod);
    }

    getNames() {
        return convertBemValueToArray(this.props.bemName)
            .map(name => `${this.context.BEM_BlockNames}__${name}`);
    }

    getClassName() {
        const names = this.getNames();
        const mods = this.getMods();
        const namesWithMods = names.map(name => addModifiersToClassName(name, mods)).join(' ');
        return `${namesWithMods} ${this.props.className}`.trimRight();
    }

    replaceModulesStyles(className){
        if(!this.context.BEM_StylesObject){
            return className;
        }
        return className.split(' ').map(className => this.context.BEM_StylesObject[className] || className).join(' ');
    }

    render() {
        const TagName = this.props.tagName;
        const className = this.replaceModulesStyles(this.getClassName());
        return (
            <TagName className={className} {...cleanUpProps(this.props)}>
                {this.props.children}
            </TagName>
        );
    }
}

Element.defaultProps = {
    bemName: [],
    bemMod: [],
    className: '',
    tagName: 'div'
};

Element.propTypes = {
    bemName: PropTypesBemValue,
    bemMod: PropTypesBemValue,
    tagName: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.any
};

Element.contextTypes = {
    BEM_BlockNames: PropTypes.arrayOf(PropTypes.string),
    BEM_StylesObject: PropTypes.object
};
