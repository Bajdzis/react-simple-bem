import React from 'react';
import PropTypes from 'prop-types'; 
import { checkBemInfoCondition, addModifiersToClassName, convertBemValueToArray, PropTypesBemValue, cleanUpProps, PropTypesBemSetting, getStringBemInfo, DEFAULT_BEM_SETTING} from '../helpers';

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
            const blockNames = this.props.bemBlock && convertBemValueToArray(this.props.bemBlock) || this.context.BEM_BlockNames;
            const result = [];
            blockNames.forEach(blockName => {
                const value = convertBemValueToArray(this.props.bemName)
                    .map(name => getStringBemInfo(name, setting))
                    .filter(info => checkBemInfoCondition(info, blockName, ''))
                    .map(info => `${blockName}${elementDelimiter}${info.className}`);
                result.push(...value);
            });
            return result;
        }

        getClassName() {
            const names = isBemBlock ? this.getNamesForBlock() : this.getNamesForElement();
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

        render() {
            const className = this.replaceModulesStyles(this.getClassName()).join(' ');
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
        className: '',
        bemBlock: null
    };

    BemDecoratorComponent.propTypes = {
        bemName: PropTypesBemValue,
        bemMod: PropTypesBemValue,
        bemBlock: PropTypesBemValue,
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


