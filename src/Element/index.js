import React from 'react';
import PropTypes from 'prop-types'; 
import {addModifiersToClassName, convertBemValueToArray, PropTypesBemValue, cleanUpProps, PropTypesBemSetting, DEFAULT_BEM_SETTING} from '../helpers';

export default class Element extends React.Component {

    getMods() {
        return convertBemValueToArray(this.props.bemMod);
    }

    getNames() {
        const setting = this.getBemSetting();
        const elementDelimiter = setting.elementDelimiter;
        return convertBemValueToArray(this.props.bemName)
            .map(name => `${this.context.BEM_BlockNames}${elementDelimiter}${name}`);
    }

    getClassName() {
        const names = this.getNames();
        const mods = this.getMods();
        const setting = this.getBemSetting();
        const modifierDelimiter = setting.modifierDelimiter;
        const namesWithMods = names.map(name => addModifiersToClassName(name, mods, modifierDelimiter)).join(' ');
        return `${namesWithMods} ${this.props.className}`.trimRight();
    }

    getBemSetting(){
        if(!this.context.BEM_Setting){
            return DEFAULT_BEM_SETTING;
        }
        return {
            ...DEFAULT_BEM_SETTING,
            ...this.context.BEM_Setting
        };
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
    BEM_StylesObject: PropTypes.object,
    BEM_Setting: PropTypesBemSetting,
};
