import React from 'react';
import PropTypes from 'prop-types'; 
import {addModifiersToClassName, convertBemValueToArray, PropTypesBemValue, cleanUpProps, PropTypesBemSetting, DEFAULT_BEM_SETTING} from '../helpers';

function bemClassName(Component, isBemBlock){
    class BemDecoratorComponent extends React.Component {

        constructor() {
            super();
            if (isBemBlock) {
                this.getChildContext = function() {
                    return {
                        BEM_BlockNames: this.getNamesForBlock(),
                    };
                };
            }
        }

        getMods() {
            return convertBemValueToArray(this.props.bemMod);
        }

        getNamesForBlock() {
            return convertBemValueToArray(this.props.bemName);
        }

        getNamesForElement() {
            const setting = this.getBemSetting();
            const elementDelimiter = setting.elementDelimiter;
            return convertBemValueToArray(this.props.bemName)
                .map(name => `${this.context.BEM_BlockNames}${elementDelimiter}${name}`);
        }

        getClassName() {
            const names = isBemBlock ? this.getNamesForBlock() : this.getNamesForElement();
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
            const className = this.replaceModulesStyles(this.getClassName());
            return (
                <Component className={className} {...cleanUpProps(this.props)}>
                    {this.props.children}
                </Component>
            );
        }
    }

    BemDecoratorComponent.defaultProps = {
        bemName: [],
        bemMod: [],
        className: ''
    };

    BemDecoratorComponent.propTypes = {
        bemName: PropTypesBemValue,
        bemMod: PropTypesBemValue,
        className: PropTypes.string,
        children: PropTypes.any
    };

    if(isBemBlock){
        BemDecoratorComponent.childContextTypes = {
            BEM_BlockNames: PropTypes.arrayOf(PropTypes.string),
        };
    }

    BemDecoratorComponent.contextTypes = {
        BEM_BlockNames: PropTypes.arrayOf(PropTypes.string),
        BEM_StylesObject: PropTypes.object,
        BEM_Setting: PropTypesBemSetting,
    };
    
    return BemDecoratorComponent;
}

export function bemBlockDecorator(Component) { return bemClassName(Component, true); }

export function bemElementDecorator(Component) { return bemClassName(Component, false); }


