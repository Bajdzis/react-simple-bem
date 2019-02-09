import React from 'react';
import PropTypes from 'prop-types'; 
import { addModifiersToClassName, convertBemValueToArray, PropTypesBemValue, PropTypesBemSetting, DEFAULT_BEM_SETTING, cleanUpProps} from '../helpers';

export class BEMNode extends React.Component{

    getMods() {
        return convertBemValueToArray(this.props.bemMod);
    }

    getNames() {
        throw new Error('getNames not implement');
    }

    getClassName() {
        const names = this.getNames();
        const mods = this.getMods();
        const setting = this.getBemSetting();
        const classNames = [];
        names.forEach(name => classNames.push(...addModifiersToClassName(name, mods, setting)));
        if(this.props.className){
            classNames.push(this.props.className);
        }
        return classNames;
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

    replaceModulesStyles(classNames){
        if(!this.context.BEM_StylesObject){
            return classNames;
        }
        return classNames.map(className => this.context.BEM_StylesObject[className] || className);
    }
    
    render(Component) {
        const className = this.replaceModulesStyles(this.getClassName()).join(' ');
        const {forwardedRef, ...props} =  this.props;
        return (
            <Component className={className} forwardedRef={forwardedRef} {...cleanUpProps(props)}>
                {this.props.children}
            </Component>
        );
    }

}

BEMNode.defaultProps = {
    bemName: [],
    bemMod: [],
    className: '',
    bemBlock: null
};

BEMNode.propTypes = {
    bemName: PropTypesBemValue,
    bemMod: PropTypesBemValue,
    bemBlock: PropTypesBemValue,
    className: PropTypes.string,
    children: PropTypes.any,
    forwardedRef: PropTypes.func,
};

BEMNode.contextTypes = {
    BEM_BlockNames: PropTypes.arrayOf(PropTypes.string),
    BEM_StylesObject: PropTypes.object,
    BEM_Setting: PropTypesBemSetting,
};
